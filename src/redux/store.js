import {configureStore} from '@reduxjs/toolkit';
import  UpaymentsData from './MainReducer/MainReducer';
export const store = configureStore({
  reducer: {
    UpaymentsData: UpaymentsData
  },
});
