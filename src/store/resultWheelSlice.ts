import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface WheelResultsState {
  spins: number[];
}

const initialState: WheelResultsState = {
  spins: [],
};

const resultsWheelSlice = createSlice({
  name: 'resultsWheel',
  initialState,
  reducers: {
    addWheelSpin: (state, action: PayloadAction<number>) => {
      const spinResult = action.payload;
      if (state.spins.length >= 25) {
        state.spins.shift();
      }
      state.spins.push(spinResult);
    },
  },
});

export const { addWheelSpin } = resultsWheelSlice.actions;
export default resultsWheelSlice.reducer;
