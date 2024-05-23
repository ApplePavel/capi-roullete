// betsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bet {
  amount: number;
  type: string;
  result: 'win' | 'loss';
}

interface BetsState {
  bets: Bet[];
}

const initialState: BetsState = {
  bets: []
};

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    addBet: (state, action: PayloadAction<Bet>) => {
      if (state.bets.length >= 10) {
        state.bets.shift(); // Удаляем первую ставку, если больше 10
      }
      state.bets.push(action.payload);
    }
  }
});

export const { addBet } = betsSlice.actions;
export default betsSlice.reducer;
