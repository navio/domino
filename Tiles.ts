export enum Pips {
  blank = "0",
  one = "1",
  two = "2",
  tree = "3",
  four = "4",
  five = "5",
  six = "6",
  seven = "7",
  eight = "8",
  nine = "9",
  ten = "10",
  eleven = "11",
  twelve = "12",
}

export const Values: number[] = Object.keys(Pips).map((pip) =>
  Number(Pips[pip])
);

export const ValuesToKeys = Object.keys(Pips).reduce((acum, pip) => {
  acum[Pips[pip]] = pip;
  return acum;
}, {});

export const KeysToValues = Object.keys(Pips).reduce((acum, pip) => {
  acum[pip] = Number(Pips[pip]);
  return acum;
}, {});

export class Tile {
  private values: [Pips, Pips];
  private isDouble: boolean = false;
  private connected = new Map<Pips, Tile>();
  public isRoot: boolean = false;

  constructor(one: Pips, two: Pips) {
    this.values = [one, two];
    if (one === two) {
      this.isDouble = true;
    }
  }

  value = () => [...this.values];

  toString = () => `[${this.values[0]},${this.values[1]}]`;

  has = (match: Pips) => this.values.includes(match);

  canAttach = (tile: Tile) => {
    const [value1, value2] = tile.value();
    const match = this.has(value1) || this.has(value2);
    if (!match) return false;

    return this.isDouble ? this.connected.size <= 4 : this.connected.size <= 2;
  };

  attach = (tile: Tile, value: Pips, options: { clean?: boolean } = {}) => {
    if (this.canAttach(tile) && tile.canAttach(this)) {
      this.connected.set(value, tile);
      if (!options.clean) {
        tile.attach(this, value, { clean: true });
      }
      return true;
    }
    return false;
  };

  attached = () => [...this.connected];
}

export type Suite = {
  [key in Pips]: Tile;
};

export type Hand = Set<Tile>;

export const generateSuite = (amount?: Pips) => {
  const box = new Set<Tile>();
  const max = Number(amount || Values[Values.length - 1]);
  for (let suiteIndex = max; suiteIndex > -1; suiteIndex--) {
    const suite = Pips[ValuesToKeys[suiteIndex]];
    const suiteTile = new Tile(suite, suite);

    box.add(suiteTile);

    for (let valueIndex = suiteIndex - 1; valueIndex > -1; valueIndex--) {
      const value = Pips[ValuesToKeys[valueIndex]];
      const tile: Tile = new Tile(suite, value);

      box.add(tile);
    }
  }

  return box;
};

export class Box {
  private box: Tile[];
  constructor(options: { box?: Set<Tile>; level?: Pips } = {}) {
    this.box = [...(options.box || generateSuite(options.level)).values()];
  }

  next = (amount: number = 1) => {
    const drawed: Tile[] = [];
    while (amount > 0) {
      const tile = this.box.pop();
      drawed.push(tile);
      amount--;
    }
    return drawed;
  };

  draw = () => this.box.splice(~~(Math.random() * this.box.length), 1);

  suffle = () => {
    const shuffled: Tile[] = [];
    while (this.box.length !== 0) {
      const randomIndex = ~~(Math.random() * this.box.length);
      shuffled.push(this.box[randomIndex]);
      this.box.splice(randomIndex, 1);
    }
    this.box = shuffled;
  };

  valueOf = () => [...this.box];
}
