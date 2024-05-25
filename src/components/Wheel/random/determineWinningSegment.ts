// components/Wheel/random/determineWinningSegment.ts
export const determineWinningSegment = (randomNumber: number): string => {
  if (randomNumber === 21) {
    return 'x20';
  } else if ([17, 25, 8, 10].includes(randomNumber)) {
    return 'x5';
  } else if ([4, 15].includes(randomNumber)) {
    return 'x10';
  } else if ([23, 2, 6, 11, 15, 19].includes(randomNumber)) {
    return 'x3';
  } else {
    return 'x1';
  }
};
