const readlines = require('../readlines');

let firstWire = null;
let secondWire = null;

const calculatePath = (wire, pointCallback) => {
  let x = 0;
  let y = 0;
  let man = 0;
  let total = 0;
  const report = () => pointCallback(`${x}.${y}`, man, total++);

  wire.forEach(({ direction, count }) => {
    if (direction === 'U') {
      for (let i = 0; i < count; i++) {
        y--;
        if (y < 0) {
          man++;
        } else {
          man--;
        }
        report();
      }
    } else if (direction === 'D') {
      for (let i = 0; i < count; i++) {
        y++;
        if (y > 0) {
          man++;
        } else {
          man--;
        }
        report();
      }
    } else if (direction === 'R') {
      for (let i = 0; i < count; i++) {
        x++;
        if (x > 0) {
          man++;
        } else {
          man--;
        }
        report();
      }
    } else if (direction === 'L') {
      for (let i = 0; i < count; i++) {
        x--;
        if (x < 0) {
          man++;
        } else {
          man--;
        }
        report();
      }
    }
  });
}

const calcPart1 = () => {
  let paths = {};
  let smallest = 99999;

  calculatePath(firstWire, (point, manhattenDistance) => {
    paths[point] = manhattenDistance;
  });
  calculatePath(secondWire, (point, manhattenDistance) => {
    if (point in paths && paths[point] < smallest) {
      smallest = paths[point];
    }
  });

  return smallest;
};

const calcPart2 = () => {
  let paths = {};
  let smallest = 99999;

  calculatePath(firstWire, (point, m, total) => {
    if (!(point in paths)) {
      paths[point] = total;
    }
  });
  calculatePath(secondWire, (point, m, total) => {
    if (point in paths && (paths[point] + total) < smallest) {
      smallest = paths[point] + total;
    }
  });

  return smallest;
};

readlines(
  (line) => {
    const getWireMapping = () =>
      line.split(',').map(([direction, ...count]) => ({
        count: parseInt(count.join(''), 10),
        direction,
      }));


    if (firstWire) {
      secondWire = getWireMapping();
    } else {
      firstWire = getWireMapping();
    }
  },
  (printResults) => {
    const part1 = calcPart1();
    const part2 = calcPart2();
    printResults([part1, part2]);
  }
);
