
import RandomOrg from 'random-org';

const randomKEY = new RandomOrg({ apiKey: '2da8fc59-9819-4e79-bf69-e1bbbea60c0a' });

type RedOrBlack = 'RED' | 'BLACK' | 'JOKER';

export const generateNumber = async (): Promise<[number, RedOrBlack]> => {
  try {
    const result = await randomKEY.generateIntegers({ min: 1, max: 50, n: 1 });
    const randomNumber = result.random.data[0];
    const RedOrBlack: RedOrBlack = Math.random() < 0.5 ? 'RED' : 'BLACK';
    if (randomNumber === 49 || randomNumber === 50) {
      return [randomNumber, 'JOKER'];
    }
    return [randomNumber, RedOrBlack];
  } catch (error) {
    console.error('Error generating random numbers:', error);
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    const RedOrBlack: RedOrBlack = Math.random() < 0.5 ? 'RED' : 'BLACK';
    if (randomNumber === 49 || randomNumber === 50) {
      return [randomNumber, 'JOKER'];
    }
    return [randomNumber, RedOrBlack];
  }
};
