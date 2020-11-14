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

  valueOf() {
    return this.values.map(Number);
  }

  toString = () => `[${this.values[0]},${this.values[1]}]`;

  has = (match: Pips) => this.values.includes(match);

  canAttach = (tile: Tile) => {
    const [value1, value2] = tile.value();
    const match = this.has(value1) || this.has(value2);
    if (!match) return false;

    return this.isDouble ? this.connected.size <= 4 : this.connected.size <= 2;
  };

  attach = (tile: Tile, value: Pips) => {
    if (this.canAttach(tile)) {
      this.connected.set(value, tile);
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
  const box = new Map<string, Tile>();
  for (const suite in Pips) {
    if (amount && Number(Pips[suite]) > Number(amount)) break;
    for (const value in Pips) {
      if (amount && Number(Pips[value]) > Number(amount)) break;
      const tile: Tile = new Tile(Pips[suite], Pips[value]);
      const key =
        Pips[suite] > Pips[value]
          ? `${Pips[suite]},${Pips[value]}`
          : `${Pips[value]},${Pips[suite]}`;
      box.set(key, tile);
    }
  }
  return box;
};

export class Box {
  private box: Tile[];
  constructor(options: { box?: Map<string, Tile>; level?: Pips } = {}) {
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
