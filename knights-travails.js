const knightsMoves = [
  [2, 1],
  [2, -1],
  [1, 2],
  [1, -2],
  [-2, 1],
  [-2, -1],
  [-1, 2],
  [-1, -2],
];

function isMoveValid(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getShortestKnightsMovesPath(startPosition, endPosition) {
    let q = [[...startPosition, 0]];
    let visitedPositions = new Set();
    let pathMap = new Map();
    visitedPositions.add(startPosition.toString());
    while(q.length) {
        let [x, y, moves] = q.shift();
        if(x === endPosition[0] && y === endPosition[1]) {
            return reconstructPath(startPosition, endPosition, pathMap, moves);
        }
        for(let [dx, dy] of knightsMoves) {
            let newX = x + dx;
            let newY = y + dy;
            let newPos = `${newX},${newY}`;
            if(isMoveValid(newX, newY) && !visitedPositions.has(newPos)) {
                q.push([newX, newY, moves + 1]);
                pathMap.set(newPos, [x, y]);
                visitedPositions.add(newPos);
            }
        }
    }
    return null;
}

function reconstructPath(startPosition, endPosition, pathMap, moves) {
    let path = [];
    let current = endPosition.toString();
    while(current !== startPosition.toString()) {
        let [x, y] = pathMap.get(current);
        path.push([x, y]);
        current = `${x},${y}`;
    }
    path.reverse();
    path.push(endPosition);
    return {
        moves,
        path,
    }
}

const ans = getShortestKnightsMovesPath([0, 0],[7, 7]);

console.log(`=> You made it in ${ans.moves} moves! Here's your path:`);
ans.path.forEach(node => console.log(node));
