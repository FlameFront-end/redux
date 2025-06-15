import {
	type DecrementAction,
	type IncrementAction,
	useAppSelector
} from '../store'
import { useDispatch } from 'react-redux'
import type { FC } from 'react'

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

	console.log('render counter', counterId)

	return (
		<div className='flex flex-row items-center justify-center gap-5 '>
			counter {counterState?.counter}
			<button
				onClick={() =>
					dispatch({
						type: 'increment',
						payload: { counterId }
					} satisfies IncrementAction)
				}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				increment
			</button>
			<button
				onClick={() =>
					dispatch({
						type: 'decrement',
						payload: { counterId }
					} satisfies DecrementAction)
				}
				className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				decriment
			</button>
		</div>
	)
}
