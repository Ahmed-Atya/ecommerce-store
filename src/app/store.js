import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice';
import cartSlice from './features/cartSlice';
import globalSlice from './features/globalSlice';
import networkSlice from './features/networkSlice';
import registerSlice from './features/registerSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { ProductsApiSlice } from './services/products';
import { CategoriesApiSlice } from './services/categories';

const persistCartConfig = {
  key: 'cart',
  storage,
}
const persistedCart = persistReducer(persistCartConfig, cartSlice);

 export const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    cart: persistedCart,
    global: globalSlice,
    network: networkSlice,
    [ProductsApiSlice.reducerPath]: ProductsApiSlice.reducer,
    [CategoriesApiSlice.reducerPath]: CategoriesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([ProductsApiSlice.middleware]).concat(CategoriesApiSlice.middleware),
});

export const persister = persistStore(store);
