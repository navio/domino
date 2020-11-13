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
    twelve = "12"
};

export const Values: number[] = Object.keys(Pips).map(pip => Number(Pips[pip]));

export const ValuesToKeys = Object.keys(Pips).reduce( (acum,pip) => {
    acum[Pips[pip]] = pip;
    return acum;
},{});

export const KeysToValues = Object.keys(Pips).reduce( (acum,pip) => {
    acum[pip] = Number(Pips[pip]);
    return acum;
},{});


export class Tile {
    constructor(one: Pips, two: Pips){
        this.values = [one, two];
    }
    private connect: [];
    private values: [Pips, Pips];

    has = (match:Pips) => this.values.includes(match);
}

export type Suite = {
    [key in Pips]: Tile
}

export type Hand = Set<Tile>;

export const GenerateSuite = () => {
    const box  = new Map<string,Tile>();
    for(const suite in Pips){
        for( const value in Pips){
            const tile: Tile = new Tile(Pips[suite],Pips[value]);
            const key = ( Pips[suite] > Pips[value]) ? 
                `${Pips[suite]},${Pips[value]}`:
                `${Pips[value]},${Pips[suite]}`;
            box.set(key,tile);
        }
    }
}