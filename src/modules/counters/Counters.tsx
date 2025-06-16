import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store.ts'
import { countersSlice } from './counters.slice.ts'

export const Counters = () => {
	return (
		<div className='flex flex-row items-center justify-center gap-5'>
			<Counter counterId='first' />
			<Counter counterId='second' />
		</div>
	)
}

interface CounterProps {
	counterId: string
}

export const Counter: FC<CounterProps> = ({ counterId }) => {
	const dispatch = useDispatch()
	const counter = useAppSelector(state =>
		countersSlice.selectors.counter(state, counterId)
	)

	return (
		<div className='flex flex-row items-center justify-center gap-5 '>
			<div>counter {counter ?? 0}</div>
			<button
				onClick={() =>
					dispatch(countersSlice.actions.increment({ counterId }))
				}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				increment
			</button>
			<button
				onClick={() =>
					dispatch(countersSlice.actions.decrement({ counterId }))
				}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				decrement
			</button>
		</div>
	)
}
