import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

import uiReducer from '@components/base/uiSlice'
// import checkoutReducer from '@components/checkout/checkoutSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
      // checkout: checkoutReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export default store
