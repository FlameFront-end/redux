type CounterState = {
	counter: number
}

type CountersState = Record<string, CounterState | undefined>

type Action = IncrementAction | DecrementAction

export type IncrementAction = {
	type: 'increment'
	payload: {
		counterId: string
	}
}

export type DecrementAction = {
	type: 'decrement'
	payload: {
		counterId: string
	}
}

const initialCounterState: CounterState = { counter: 0 }
const initialCountersState: CountersState = {}

export const countersReducer = (
	state = initialCountersState,
	action: Action
): CountersState => {
	switch (action.type) {
		case 'increment': {
			const { counterId } = action.payload
			const currentCounter = state[counterId] ?? initialCounterState

			return {
				...state,
				[counterId]: {
					...currentCounter,
					counter: currentCounter.counter + 1
				}
			}
		}
		case 'decrement': {
			const { counterId } = action.payload
			const currentCounter = state[counterId] ?? initialCounterState

			return {
				...state,
				[counterId]: {
					...currentCounter,
					counter: currentCounter.counter - 1
				}
			}
		}

		default:
			return state
	}
}
