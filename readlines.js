const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');

const fileStream = fs.createReadStream('./input');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const printResults = (results) => {
  if (Array.isArray(results)) {
    results.forEach((result, i) => {
      console.log(`Part ${i}: ${result}`);
    });
  } else {
    console.log(`Part 0: ${results}`);
  }
}

module.exports = (readlineCallback, done) => {
  rl.on('line', readlineCallback);
  rl.once('close', () => done(printResults));
};
