# Dominos

## Deck

### Creating a Deck

```javascript
    import {generateSuite, Box, Pips, Tile} from 'domino-engine';
    const box = new Box();
```

### Interacting with a Deck
```javascript
    const tile: Tile = Box.draw(); // Randomly Selected
    const [tile1, tile2, tile3] = Box.next(3); // [0,0]; [0,1]; [0,2]; // Next
```

### Shuffling the Deck
```javascript
    const [tile1] = Box.next(); // [0,0];
    const tile: Tile = Box.shuffle() // Shuffle Values
    const [tile2, tile3, tile4] = Box.next(3); // [Random]; [Random+1]; [Random+2]; // Next
```

## Tile
```javascript
    const [tile1, tile2, tile3] = Box.next(3); // [0,0]; [0,1]; [0,2];
    tile1.canAttach(tile2); // true
    tile2.attach(tile1, tile.value[0]); // true
    tile2.attach(tile3, tile.value[0]); // true

```
