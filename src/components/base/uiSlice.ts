// import { useMemo, useCallback } from 'react'
import { createSlice } from '@reduxjs/toolkit'
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { AppState, useAppDispatch, useAppSelector } from '@lib/store'

export interface StateUI {
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  sidebarView: string
  modalView: string
  userAvatar: string
}

const initialState: StateUI = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  sidebarView: 'CART_VIEW',
  userAvatar: '',
}

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW' | 'NEW_SHIPPING_ADDRESS' | 'NEW_PAYMENT_METHOD'

type SIDEBAR_VIEWS =
  | 'CART_VIEW'
  | 'CHECKOUT_VIEW'
  | 'PAYMENT_METHOD_VIEW'
  | 'MOBILEMENU_VIEW'
  | 'PAYMENT_VIEW'
  | 'SHIPPING_VIEW'

// reducers
const openSidebar: CaseReducer<StateUI> = state => {
  state.displaySidebar = true
}

const closeSidebar: CaseReducer<StateUI> = state => {
  state.displaySidebar = false
}

const openDropdown: CaseReducer<StateUI> = state => {
  state.displayDropdown = true
}

const closeDropdown: CaseReducer<StateUI> = state => {
  state.displayDropdown = false
}

const openModal: CaseReducer<StateUI> = state => {
  state.displayModal = true
}

const closeModal: CaseReducer<StateUI> = state => {
  state.displayModal = false
}

const setModalView: CaseReducer<StateUI, PayloadAction<{ view: string }>> = (state, action) => {
  state.modalView = action.payload.view
}

const setSidebarView: CaseReducer<StateUI, PayloadAction<{ view: string }>> = (state, action) => {
  state.sidebarView = action.payload.view
}

const setUserAvatar: CaseReducer<StateUI, PayloadAction<{ value: string }>> = (state, action) => {
  state.userAvatar = action.payload.value
}

const reducers = {
  openSidebar,
  closeSidebar,
  openDropdown,
  closeDropdown,
  openModal,
  closeModal,
  setModalView,
  setSidebarView,
  setUserAvatar,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers,
})

export const selectState = (state: AppState) => state.ui

export default uiSlice.reducer

// export const useUI = () => {
//   const dispatch = useAppDispatch()
//   const state = useAppSelector(selectState)

//   const openSidebar = useCallback(() => dispatch(uiSlice.actions.openSidebar), [dispatch])

//   const closeSidebar = useCallback(() => dispatch(uiSlice.actions.closeSidebar), [dispatch])

//   const toggleSidebar = useCallback(
//     () => (state.displaySidebar ? dispatch(uiSlice.actions.closeSidebar) : dispatch(uiSlice.actions.openSidebar)),
//     [dispatch, state.displaySidebar]
//   )

//   const closeSidebarIfPresent = useCallback(
//     () => state.displaySidebar && dispatch(uiSlice.actions.closeSidebar),
//     [dispatch, state.displaySidebar]
//   )

//   const openDropdown = useCallback(() => dispatch(uiSlice.actions.openDropdown), [dispatch])

//   const closeDropdown = useCallback(() => dispatch(uiSlice.actions.closeDropdown), [dispatch])

//   const openModal = useCallback(() => dispatch(uiSlice.actions.openModal), [dispatch])

//   const closeModal = useCallback(() => dispatch(uiSlice.actions.closeModal), [dispatch])

//   const setUserAvatar = useCallback((value: string) => dispatch(uiSlice.actions.setUserAvatar({ value })), [dispatch])

//   const setModalView = useCallback((view: MODAL_VIEWS) => dispatch(uiSlice.actions.setModalView({ view })), [dispatch])

//   const setSidebarView = useCallback(
//     (view: SIDEBAR_VIEWS) => dispatch(uiSlice.actions.setSidebarView({ view })),
//     [dispatch]
//   )

//   return useMemo(
//     () => ({
//       ...state,
//       openSidebar,
//       closeSidebar,
//       toggleSidebar,
//       closeSidebarIfPresent,
//       openDropdown,
//       closeDropdown,
//       openModal,
//       closeModal,
//       setModalView,
//       setSidebarView,
//       setUserAvatar,
//     }),
//     [state]
//   )
// }
