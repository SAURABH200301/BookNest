import { PayloadAction } from "@reduxjs/toolkit";
import { getInitialUserState, UserState } from "../state";


export function setUserHandler(
  state: UserState,
  action: PayloadAction<UserState>
) {
   return { ...state, ...action.payload };
}

export function removeUserHandler(state: UserState) {
  return getInitialUserState();
}
