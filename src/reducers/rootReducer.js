import { combineReducers } from "redux";
import { authReducer } from "./authReducer";

import { calendarReducer } from "./calendarReducer";
import { uiRedeucer } from "./uiRedeucer";

export const rootReducer = combineReducers({
    ui: uiRedeucer,
    calendar: calendarReducer,
    auth: authReducer
})