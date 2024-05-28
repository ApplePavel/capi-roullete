export const determineWinningSegment = (randomNumber: number): string  => {

  const ranges = [
    { range: [1, 4], value: '2' },
    { range: [5, 8], value: '3' },
    { range: [9, 12], value: '4' },
    { range: [13, 16], value: '5' },
    { range: [17, 20], value: '6' },
    { range: [21, 24], value: '7' },
    { range: [25, 28], value: '8' },
    { range: [29, 32], value: '9' },
    { range: [33, 36], value: 'J' },
    { range: [37, 40], value: 'Q' },
    { range: [41, 44], value: 'K' },
    { range: [45, 48], value: 'A' }
  ];

  for (const { range, value } of ranges) {
    if (randomNumber >= range[0] && randomNumber <= range[1]) {
      return value;
    }
  }
  return 'Joker';
};
