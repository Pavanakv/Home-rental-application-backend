import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./state";  // Ensure this is the correct import for your root reducer

// Redux-Persist Configuration
const persistConfig = {
  key: "root",    // Key to store in localStorage (or any storage you configure)
  version: 1,     // Versioning for persistence, increments when state structure changes
  storage,        // Uses localStorage by default
};

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignoring Redux-Persist actions that aren't serializable
        ignoredActions: [
          "persist/FLUSH", 
          "persist/REHYDRATE", 
          "persist/PAUSE", 
          "persist/PERSIST", 
          "persist/PURGE", 
          "persist/REGISTER"
        ],
      },
    }),
});

// Create and export the persistor to use in your app for persistence management
export let persistor = persistStore(store);



