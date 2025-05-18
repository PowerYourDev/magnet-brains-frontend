import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";


import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import userSlice from "./sliceReducers/userSlice"
import taskSlice from "./sliceReducers/taskSlice"









const reducer = combineReducers({
    userSlice: userSlice,
    taskSlice:taskSlice
    
  
  });

   const rootReducer = (state, action) => {
    if (action.type === "RESET_STATE") {
      // Reset the state to initial values
      state = undefined; // This will reset the state to its initial state
    }
    return reducer(state, action);
  };


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
  });

export default store