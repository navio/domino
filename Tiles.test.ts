import {generateSuite, Box} from './Tiles';
const box = new Box();

test('Generate 91 Tiles', () => {
    expect([...box.valueOf()].length).toBe(91);
  });

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


