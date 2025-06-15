import { type FC, useMemo, useState } from 'react'
import {
	useAppDispatch,
	useAppSelector,
	type User,
	type UserRemoveSelectedAction,
	type UserSelectedAction
} from '../store.ts'

export const UsersList = () => {
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')

	const ids = useAppSelector(state => state.users.ids)
	const entities = useAppSelector(state => state.users.entities)
	const selectedUser = useAppSelector(state =>
		state.users.selectedUerId
			? state.users.entities[state.users.selectedUerId]
			: undefined
	)

	const sortedUsers = useMemo(
		() =>
			ids
				.map(id => entities[id])
				.sort((a, b) => {
					if (sortType === 'asc') {
						return a.name.localeCompare(b.name)
					} else {
						return b.name.localeCompare(a.name)
					}
				}),
		[ids, entities, sortType]
	)

	return (
		<div className='flex flex-col items-center'>
			{!selectedUser ? (
				<div className='flex flex-col items-center justify-between'>
					<div className='flex flex-row items-center'>
						<button
							onClick={() => setSortType('asc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							Asc
						</button>
						<button
							onClick={() => setSortType('desc')}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
						>
							Desc
						</button>
					</div>
					<ul className='list-none'>
						{sortedUsers.map(user => (
							<UserListItem user={user} key={user.id} />
						))}
					</ul>
				</div>
			) : (
				<SelectedUser user={selectedUser} />
			)}
		</div>
	)
}

interface UserListItemProps {
	user: User
}

const UserListItem: FC<UserListItemProps> = ({ user }) => {
	const dispatch = useAppDispatch()

	const handleUserClick = () => {
		dispatch({
			type: 'userSelected',
			payload: {
				userId: user.id
			}
		} satisfies UserSelectedAction)
	}

	return (
		<li key={user.id} className='py-2' onClick={handleUserClick}>
			<span className='hover:underline cursor-pointer'>{user.name}</span>
		</li>
	)
}

interface SelectedUserProps {
	user: User
}

const SelectedUser: FC<SelectedUserProps> = ({ user }) => {
	const dispatch = useAppDispatch()

	const handleBackButtonClick = () => {
		dispatch({
			type: 'userRemoveSelected',
			payload: {
				userId: user.id
			}
		} satisfies UserRemoveSelectedAction)
	}

	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={handleBackButtonClick}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md'
			>
				Back
			</button>
			<h2 className='text-3xl'>{user.name}</h2>
			<p className='text-xl'>{user.description}</p>
		</div>
	)
}
