import { createAction, createReducer } from '@reduxjs/toolkit'

type CounterState = {
	counter: number
}

type CountersState = Record<string, CounterState | undefined>

const initialCounterState: CounterState = { counter: 0 }
const initialCountersState: CountersState = {}

export const incrementAction = createAction<{ counterId: string }>(
	'counters/increment'
)
export const decrementAction = createAction<{ counterId: string }>(
	'counters/decrement'
)

export const countersReducer = createReducer(initialCountersState, builder => {
	builder.addCase(incrementAction, (state, action) => {
		const { counterId } = action.payload

		if (!state[counterId]) {
			state[counterId] = initialCounterState
		}

		state[counterId].counter++
	})
	builder.addCase(decrementAction, (state, action) => {
		const { counterId } = action.payload

		if (!state[counterId]) {
			state[counterId] = initialCounterState
		}

		state[counterId].counter--
	})
})
