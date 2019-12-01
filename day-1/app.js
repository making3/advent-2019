const fs = require('fs');
const readline = require('readline');

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
const fileStream = fs.createReadStream('./input');

(async () => {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let initialFuel = 0;
  let totalFuel = 0;

  rl.on('line', (line) => {
    const parsed = parseInt(line, 10);
    initialFuel += calc(parsed);
    totalFuel += calcTotalFuel(parsed);
  });

  rl.once('close', () => {
    console.log('Part 1: ', initialFuel);
    console.log('Part 2: ', totalFuel);
  });
})();
