import { createAction, createReducer } from '@reduxjs/toolkit'

export type UserId = string

export type User = {
	id: UserId
	name: string
	description: string
}

export type UsersState = {
	entities: Record<UserId, User>
	ids: UserId[]
	selectedUerId: UserId | undefined
}

export const initialUsersList: User[] = Array.from(
	{ length: 3000 },
	(_, index) => ({
		id: `user${index + 1}`,
		name: `User ${index + 1}`,
		description: `Description for User ${index + 1}`
	})
)

const initialUsersState: UsersState = {
	entities: {},
	ids: [],
	selectedUerId: undefined
}

export const userSelectedAction = createAction<{ userId: string }>(
	'users/selected'
)
export const userRemoveSelectedAction = createAction<{ userId: string }>(
	'users/removeSelected'
)
export const usersStoredAction = createAction<{ users: User[] }>('users/stored')

export const usersReducer = createReducer(initialUsersState, builder => {
	builder.addCase(usersStoredAction, (state, action) => {
		const { users } = action.payload
		state.entities = users.reduce(
			(acc, user) => {
				acc[user.id] = user
				return acc
			},
			{} as Record<UserId, User>
		)
		state.ids = users.map(user => user.id)
	})
	builder.addCase(userSelectedAction, (state, action) => {
		state.selectedUerId = action.payload.userId
	})
	builder.addCase(userRemoveSelectedAction, state => {
		state.selectedUerId = undefined
	})
})
