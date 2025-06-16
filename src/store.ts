import {
	combineReducers,
	configureStore,
	createSelector
} from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { countersReducer } from './modules/counters/counters.slice'
import {
	initialUsersList,
	usersReducer,
	usersStoredAction
} from './modules/users/store/users.slice.ts'

const reducer = combineReducers({
	users: usersReducer,
	counters: countersReducer
})

export const store = configureStore({
	reducer: reducer
})

store.dispatch(usersStoredAction({ users: initialUsersList }))

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<AppState>()
