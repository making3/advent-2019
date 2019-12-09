const readlines = require('../readlines');
let part1 = 0;
let part2 = 0;

const opcodeCalc = (nums) => {
  let i = 0;
  while (i < nums.length) {
    if (nums[i] === 1) {
      nums[nums[i+3]] = nums[nums[i+1]] + nums[nums[i+2]];
    } else if (nums[i] === 2) {
      nums[nums[i+3]] = nums[nums[i+1]] * nums[nums[i+2]];
    } else if (nums[i] === 99) {
      break;
    }
    i += 4;
  }
  return nums[0];
}

const calcFirstPair = (nums) => {
  const cloned = nums.slice(0);
  cloned[1] = 12;
  cloned[2] = 2;
  part1 = opcodeCalc(cloned);
};

const calcExpectedPair = (nums, expected) => {
  for (let i = 0; i < 100; i++) {
    for (let k = 0; k < 100; k++) {
      const cloned = nums.slice(0);
      cloned[1] = i;
      cloned[2] = k;
      const result = opcodeCalc(cloned);
      if (result === expected) {
        part2 = 100 * i + k;
        return;
      };
    }
  }
};

readlines((line) => {
  const nums = line.split(',').map((n) => parseInt(n, 10));
  calcFirstPair(nums);
  calcExpectedPair(nums, 19690720);
}, (printResults) => {
  printResults([part1, part2]);
});
