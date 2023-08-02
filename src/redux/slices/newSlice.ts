import { createSlice } from "@reduxjs/toolkit";
import { NewsType } from "../../types/newsType";
import { newsActions } from "../../actions/newsActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";
import { produce } from "immer";

interface InitialProps {
  newsList: NewsType[];
  isLoading: boolean;
}

const initialState: InitialProps = {
  newsList: [],
  isLoading: false,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newsActions.gets.fulfilled, (state, action) => {
        state.newsList = action.payload;
      })
      .addCase(newsActions.create.fulfilled, (state, action) => {
        state.newsList.push(action.payload);
      })
      .addCase(newsActions.update.fulfilled, (state, action) => {
        state.newsList.find((news, index) => {
          if (news._id === action.payload._id) {
            state.newsList[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(newsActions.delete.fulfilled, (state, action) => {
        const newsIndex = state.newsList.findIndex(
          (news) => news._id === action.meta.arg
        );
        state.newsList.splice(newsIndex, 1);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default newsSlice.reducer;
