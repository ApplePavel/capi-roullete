export const determineWinningSegment = (randomNumber: number): string => {
  if (randomNumber === 25) {
    return 'x21';
  } else if ([4,11,13,21].includes(randomNumber)) {
    return 'x6';
  } else if ([8, 17].includes(randomNumber)) {
    return 'x11';
  } else if ([2,6,10,15,19,23].includes(randomNumber)) {
    return 'x4';
  } else {
    return 'x2';
  }
};
