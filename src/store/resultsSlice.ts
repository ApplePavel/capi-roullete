// resultsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResultsState {
  spins: number[];
  count: {
    yellow: number;
    black: number;
    golden: number;
  };
}

const initialState: ResultsState = {
  spins: [],
  count: {
    yellow: 0,
    black: 0,
    golden: 0,
  },
};

const resultsSlice = createSlice({
  name: 'results',
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

export const { addSpin } = resultsSlice.actions;
export default resultsSlice.reducer;

export const determineWinningSegment = (randomNumber: number): 'yellow' | 'black' | 'golden' => {
  if (randomNumber === 4) {
    return 'golden';
  } else if ([2, 5, 7, 9, 11, 13, 15].includes(randomNumber)) {
    return 'yellow';
  } else {
    return 'black';
  }
};
