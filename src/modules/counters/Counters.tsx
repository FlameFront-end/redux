import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store.ts'
import { decrementAction, incrementAction } from './counters.slice.ts'

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
	const counterState = useAppSelector(state => state.counters[counterId])

	return (
		<div className='flex flex-row items-center justify-center gap-5 '>
			<div>counter {counterState?.counter}</div>
			<button
				onClick={() => dispatch(incrementAction({ counterId }))}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				increment
			</button>
			<button
				onClick={() => dispatch(decrementAction({ counterId }))}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				decriment
			</button>
		</div>
	)
}
