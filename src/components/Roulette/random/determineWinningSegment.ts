export const determineWinningSegment = (randomNumber: number): string => {
    if (randomNumber === 4) {
      return 'golden';
    } else if ([2, 5, 7, 9, 11, 13, 15,].includes(randomNumber)) {
      return 'yellow';
    } else {
      return 'black';
    }
};
