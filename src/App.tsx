import type { FC } from 'react'
import {
	type DecrementAction,
	type IncrementAction,
	useAppDispatch,
	useAppSelector
} from './store.ts'
import './styles/App.css'

function App() {
	return (
		<div className='card'>
			<Counter counterId='1' />
			<Counter counterId='2' />
			<Counter counterId='3' />
		</div>
	)
}

interface CounterProps {
	counterId: string
}

export const Counter: FC<CounterProps> = ({ counterId }) => {
	const dispatch = useAppDispatch()
	const counterState = useAppSelector(state => state.counters[counterId])

	// useSelector вызывается на каждое изменение, исходя из этого,
	// если мы достанем state, то будет ререндер на каждое изменение, а если мы достанем только то, что нужно (в данный момент только один конкретный counter),
	// то ререндер будет происходить только после изменение конкретно его
	// ИТОГ: ДОСТАВАТЬ МАКСИМАЛЬНО МАЛЕНЬКИЙ НУЖНЫЙ КУСОЧЕК STATE и желательно использовать в селекторе сложность О(1), так как очень часто оно перезапускается и не создавать новые ссылки

	console.log(`render ${counterId}`)

	return (
		<div className='card'>
			<div>counter {counterState?.counter}</div>
			<button
				onClick={() =>
					dispatch({
						type: 'increment',
						payload: {
							counterId
						}
					} satisfies IncrementAction)
				}
			>
				+
			</button>
			<button
				onClick={() =>
					dispatch({
						type: 'decrement',
						payload: {
							counterId
						}
					} satisfies DecrementAction)
				}
			>
				-
			</button>
		</div>
	)
}

export default App
