import {generateSuite, Box, Pips} from './Tiles';
const box = new Box();

test('Generate 91 Tiles', () => {
    expect([...box.valueOf()].length).toBe(91);
  });

test('Generates a 6 Level Box with 28 Tiles', () => {
    const boxOfSix = new Box({level: Pips.six});
    expect( [...boxOfSix.valueOf()].length).toBe(28);
})

test('It draws one Tile', () => {
    expect(box.draw().length).toBe(1);
});

test('It reduces count by 3', () => {
    box.draw();
    box.draw();
    box.draw();
    expect(box.valueOf().length).toBe(87);
});

test('It gets 10 Tiles in one request', () => {
    const tiles = box.next(10);
    expect(tiles.length).toBe(10);
});

test('It shuffles', () => {
    const tiles = box.valueOf();
    box.suffle();
    const tilesShuffled = box.valueOf();
    expect(tiles.toString() === tilesShuffled.toString()).toBe(false);
});

test('Comparison of tiles works', () => {
    const one = box.draw();
    const two = one;
    const three = box.draw();
    expect(one).toEqual(two);
    expect(two).not.toEqual(three);
})


