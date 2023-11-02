import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";

// internally crafted imports of resources
import { MainApi } from ".";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [MainApi.reducerPath]: MainApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (GDM) => GDM().concat(MainApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
