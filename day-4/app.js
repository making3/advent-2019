const readlines = require('../readlines');

const getRange = (range) => {
  const [minStr, maxStr] = range.split('-');
  const min = parseInt(minStr, 10);
  const max = parseInt(maxStr, 10);
  return [min, max];
};

const calcOutput = (range, hasAdjFunc) => {
  const [min, max] = getRange(range);
  let count = 0;
  for (let i = min; i < max; i++) {
    const current = i.toString();
    let hasAdj = false;
    let decreases = true;
    for (let k = 1; k < 6; k++) {
      if (hasAdjFunc(current, k)) {
        hasAdj = true;
      }
      if (current[k] < current[k-1]) {
        decreases = false;
      }
    }
    if (hasAdj && decreases) {
      count++;
    }
  }
  return count;
};

let input;
readlines((line) => {
  input = line;
}, (printResults) => {
  const part1 = calcOutput(input, (current, k) =>
    current[k] === current[k-1]
  );

  const part2 = calcOutput(input, (current, k) =>
    current[k] === current[k-1] &&
    current[k-2] !== current[k-1] &&
    current[k] !== current[k+1]
  );

  printResults([part1, part2]);
});
