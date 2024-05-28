import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RouletteResultsState {
  spins: number[];
  count: {
    yellow: number;
    black: number;
    golden: number;
  };
}

const initialState: RouletteResultsState = {
  spins: [],
  count: {
    yellow: 0,
    black: 0,
    golden: 0,
  },
};

const resultsRouletteSlice = createSlice({
  name: 'resultsRoulette',
  initialState,
  reducers: {
    addSpin: (state, action: PayloadAction<number>) => {
      const spinResult = action.payload;
      const segment = determineWinningSegment(spinResult);

      if (state.spins.length >= 100) {
        const removedSpin = state.spins.shift();
        const removedSegment = determineWinningSegment(removedSpin!);
        state.count[removedSegment] -= 1;
      }

      state.spins.push(spinResult);
      state.count[segment] += 1;
    },
  },
});

export const { addSpin } = resultsRouletteSlice.actions;
export default resultsRouletteSlice.reducer;

export const determineWinningSegment = (randomNumber: number): 'yellow' | 'black' | 'golden' => {
  if (randomNumber === 4) {
    return 'golden';
  } else if ([2, 5, 7, 9, 11, 13, 15].includes(randomNumber)) {
    return 'yellow';
  } else {
    return 'black';
  }
};
