export type UserId = string
export type User = {
	id: UserId
	name: string
	description: string
}

export const initialUsersList: User[] = Array.from(
	{ length: 3000 },
	(_, index) => ({
		id: `user${index + 11}`,
		name: `User ${index + 11}`,
		description: `Description for User ${index + 11}`
	})
)

type UsersState = {
	entities: Record<UserId, User>
	ids: UserId[]
	selectedUerId: UserId | undefined
}

export type UserSelectedAction = {
	type: 'userSelected'
	payload: {
		userId: UserId
	}
}

export type UserRemoveSelectedAction = {
	type: 'userRemoveSelected'
	payload: {
		userId: UserId
	}
}

export type UsersStoredAction = {
	type: 'usersStored'
	payload: {
		users: User[]
	}
}

type Action = UserSelectedAction | UserRemoveSelectedAction | UsersStoredAction

const initialUsersState: UsersState = {
	entities: {},
	ids: [],
	selectedUerId: undefined
}

export const usersReducer = (
	state = initialUsersState,
	action: Action
): UsersState => {
	switch (action.type) {
		case 'usersStored': {
			const { users } = action.payload
			return {
				...state,
				entities: users.reduce(
					(acc, user) => {
						acc[user.id] = user
						return acc
					},
					{} as Record<UserId, User>
				),
				ids: users.map(user => user.id)
			}
		}
		case 'userSelected': {
			const { userId } = action.payload
			return {
				...state,
				selectedUerId: userId
			}
		}
		case 'userRemoveSelected': {
			return {
				...state,
				selectedUerId: undefined
			}
		}

		default:
			return state
	}
}
