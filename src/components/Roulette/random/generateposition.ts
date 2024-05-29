import RandomOrg from 'random-org';

const randomKEY = new RandomOrg({ apiKey: '2da8fc59-9819-4e79-bf69-e1bbbea60c0a' });



export const generateSpinPosition = async (): Promise<number[]> => {
  try {
    const result = await randomKEY.generateIntegers({ min: 1, max: 15, n: 1 });
    const randomNumber = result.random.data[0];
    const slippagePosition = Math.floor(Math.random() * 91) +5;
    const spinPosition = 100 * randomNumber - slippagePosition;
    return [randomNumber, spinPosition];
  } catch (error) {
    console.error('Error generating random numbers:', error);
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    const slippagePosition = Math.floor(Math.random() * 91) +5;
    const spinPosition = randomNumber * 100 - slippagePosition;
    return [randomNumber, spinPosition];
  }
};
