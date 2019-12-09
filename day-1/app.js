const readlines = require('../readlines');

const calc = (num) => Math.floor(num / 3) - 2;

const cache = {};
const calcTotalFuel = (num) => {
  if (cache[num]) {
    return cache[num];
  }

  const output = calc(num);
  if (output > 0) {
    cache[num] = calcTotalFuel(output) + output;
    return cache[num];
  }
  return 0;
};

let initialFuel2 = 0;
let totalFuel2 = 0;

readlines(
  (line) => {
    const parsed = parseInt(line, 10);
    initialFuel2 += calc(parsed);
    totalFuel2 += calcTotalFuel(parsed);
  },
  (printResults) => printResults([initialFuel2, totalFuel2]),
);
