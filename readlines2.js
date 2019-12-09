const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');

class ReadLines extends EventEmitter {
  constructor() {
    super();
    const fileStream = fs.createReadStream('./input');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    rl.on('line', (line) => {
      this.emit('line', line);
    });
    rl.once('close', () => {
      this.emit('close');
    });

    this.results = [];
  }

  register(part, output) {
    this.results.push({
      part,
      output
    });
  }

  print() {
    this.results.forEach(({ part, output }) => {
      console.log(`Part ${part}: ${output}`);
    });
  }
}

module.exports = ReadLines;


/*
(async () => {
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
*/
