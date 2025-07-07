import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productsCount: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setProductsCount: (state, action) => {
      state.productsCount = action.payload
    },
  },
})

export const { setProductsCount } = basketSlice.actions

export default basketSlice.reducer