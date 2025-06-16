import {
	createSelector,
	createSlice,
	type PayloadAction
} from '@reduxjs/toolkit'

export type UserId = string

export type User = {
	id: UserId
	name: string
	description: string
}

type UsersState = {
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

const initialState: UsersState = {
	entities: {},
	ids: [],
	selectedUerId: undefined
}

export const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		selected: (state, action: PayloadAction<{ userId: UserId }>) => {
			state.selectedUerId = action.payload.userId
		},
		selectRemove: state => {
			state.selectedUerId = undefined
		},
		stored: (state, action: PayloadAction<{ users: User[] }>) => {
			const { users } = action.payload
			state.entities = users.reduce(
				(acc, user) => {
					acc[user.id] = user
					return acc
				},
				{} as Record<UserId, User>
			)
			state.ids = users.map(user => user.id)
		}
	},
	selectors: {
		selectedUser: state =>
			state.selectedUerId
				? state.entities[state.selectedUerId]
				: undefined,
		sortedUsers: createSelector(
			(state: UsersState) => state.ids,
			(state: UsersState) => state.entities,
			(_: UsersState, sort: 'asc' | 'desc') => sort,
			(ids, entities, sort) =>
				ids
					.map(id => entities[id])
					.sort((a, b) =>
						sort === 'asc'
							? a.name.localeCompare(b.name)
							: b.name.localeCompare(a.name)
					)
		)
	}
})
