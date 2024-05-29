export const determineWinningSegment = (randomNumber: number): string => {
    if (randomNumber === 7) {
      return 'golden';
    } else if ([1, 3, 5, 8, 10, 12, 14].includes(randomNumber)) {
      return 'yellow';
    } else {
      return 'black';
    }
};
