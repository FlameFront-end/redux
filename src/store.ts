import { configureStore, createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { countersSlice } from './modules/counters/counters.slice'
import { initialUsersList, usersSlice } from './modules/users/users.slice.ts'

export const store = configureStore({
	reducer: {
		[countersSlice.name]: countersSlice.reducer,
		[usersSlice.name]: usersSlice.reducer
	}
})

store.dispatch(usersSlice.actions.stored({ users: initialUsersList }))

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
