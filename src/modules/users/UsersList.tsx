import { type FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store.ts'
import {
	type User,
	userRemoveSelectedAction,
	userSelectedAction
} from './store/users.slice.ts'
import { selectSelectedUser, selectSortedUsers } from './store/selectors.ts'

export const UsersList = () => {
	const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')

	const selectedUser = useAppSelector(state => selectSelectedUser(state))
	const sortedUsers = useAppSelector(state =>
		selectSortedUsers(state, sortType)
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

	return (
		<li
			key={user.id}
			className='py-2'
			onClick={() => dispatch(userSelectedAction({ userId: user.id }))}
		>
			<span className='hover:underline cursor-pointer'>{user.name}</span>
		</li>
	)
}

interface SelectedUserProps {
	user: User
}

const SelectedUser: FC<SelectedUserProps> = ({ user }) => {
	const dispatch = useAppDispatch()

	return (
		<div className='flex flex-col items-center'>
			<button
				onClick={() =>
					dispatch(userRemoveSelectedAction({ userId: user.id }))
				}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md'
			>
				Back
			</button>
			<h2 className='text-3xl'>{user.name}</h2>
			<p className='text-xl'>{user.description}</p>
		</div>
	)
}
