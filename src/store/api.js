import { store } from './index.js';
import { setProductsCount } from './slices/basket.js';

export const storeAPI = {
  store: store,
  
  actions: {
    setProductsCount: (count) => store.dispatch(setProductsCount(count)),
  },
  
  getState: () => store.getState(),
  
  subscribe: (callback) => store.subscribe(callback),
  
  dispatch: (action) => store.dispatch(action),
  
  getBasketCount: () => store.getState().basket.productsCount,
  
  updateBasketCount: (count) => {
    store.dispatch(setProductsCount(count));
  }
};

if (typeof window !== "undefined") {
  window.cngAiChatStore = storeAPI;
}

export default storeAPI;
