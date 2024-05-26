// components/Wheel/random/generatePosition.ts
import RandomOrg from 'random-org';

const randomKEY = new RandomOrg({ apiKey: '2da8fc59-9819-4e79-bf69-e1bbbea60c0a' });

export const generateSpinPosition = async (): Promise<number[]> => {
  try {
    const result = await randomKEY.generateIntegers({ min: 1, max: 25, n: 1 });
    const randomNumber = result.random.data[0];
    const slippagePosition = (Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1);
    const spinPosition = randomNumber * 14.4 - slippagePosition;
    console.log(randomNumber)
    return [randomNumber, spinPosition];
  } catch (error) {
    console.error('Error generating random numbers:', error);
    const randomNumber = Math.floor(Math.random() * 25) + 1;
    const slippagePosition = (Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1);
    const spinPosition = randomNumber * 14.4 - slippagePosition;
    return [randomNumber, spinPosition];
  }
};
