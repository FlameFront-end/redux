import './styles/App.css'
import {
	type AppState,
	type CounterId,
	type DecrementAction,
	type IncrementAction,
	store
} from './store.ts'
import { useEffect, useReducer, useRef } from 'react'

function App() {
	return (
		<div className='card'>
			<Counter counterId='1' />
			<Counter counterId='2' />
			<Counter counterId='3' />
		</div>
	)
}

const selectCounter = (state: AppState, counterId: CounterId) =>
	state.counters[counterId]

export const Counter = ({ counterId }: { counterId: CounterId }) => {
	const [, forceUpdate] = useReducer(x => x + 1, 0)

	const lastStateRef = useRef<ReturnType<typeof selectCounter> | null>(null)

	console.log(`render ${counterId}`)

	useEffect(() => {
		return store.subscribe(() => {
			const currentState = selectCounter(store.getState(), counterId)
			const lastState = lastStateRef.current

			if (currentState !== lastState) {
				forceUpdate()
			}

			lastStateRef.current = currentState
		})
	}, [])

	const counterState = selectCounter(store.getState(), counterId)

	return (
		<div className='card'>
			<div>counter {counterState?.counter}</div>
			<button
				onClick={() =>
					store.dispatch({
						type: 'increment',
						payload: {
							counterId
						}
					} satisfies IncrementAction)
				}
			>
				increment
			</button>
			<button
				onClick={() =>
					store.dispatch({
						type: 'decrement',
						payload: {
							counterId
						}
					} satisfies DecrementAction)
				}
			>
				decrement
			</button>
		</div>
	)
}

export default App
