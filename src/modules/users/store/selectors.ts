import { type AppState, createAppSelector } from '../../../store.ts'

export const selectSortedUsers = createAppSelector(
	(state: AppState) => state.users.ids,
	(state: AppState) => state.users.entities,
	(_: AppState, sort: 'asc' | 'desc') => sort,
	(ids, entities, sort) =>
		ids
			.map(id => entities[id])
			.sort((a, b) =>
				sort === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name)
			)
)

export const selectSelectedUser = (state: AppState) =>
	state.users.selectedUerId
		? state.users.entities[state.users.selectedUerId]
		: undefined
