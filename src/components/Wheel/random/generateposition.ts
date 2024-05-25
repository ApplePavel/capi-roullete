// components/Wheel/random/generatePosition.ts
import RandomOrg from 'random-org';

const randomKEY = new RandomOrg({ apiKey: '2da8fc59-9819-4e79-bf69-e1bbbea60c0a' });

export const generateSpinPosition = async (): Promise<number[]> => {
  try {
    const result = await randomKEY.generateIntegers({ min: 1, max: 25, n: 1 });
    const randomNumber = result.random.data[0];
    console.log(randomNumber);
    const spinPosition = 1440 - 1065.4 - randomNumber * 14.4;
    return [randomNumber, spinPosition];
  } catch (error) {
    console.error('Error generating random numbers:', error);
    const randomNumber = Math.floor(Math.random() * 25) + 1;
    const spinPosition = 1440 - 1080 - randomNumber * 14.4;
    console.log(randomNumber);
    return [randomNumber, spinPosition];
  }
};
