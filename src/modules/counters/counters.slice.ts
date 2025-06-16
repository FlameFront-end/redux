import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type CounterState = {
	counter: number
}

type CountersState = Record<string, CounterState | undefined>

const initialCounterState: CounterState = { counter: 0 }
const initialCountersState: CountersState = {}

export const countersSlice = createSlice({
	name: 'counters',
	initialState: initialCountersState,
	reducers: {
		increment: (state, action: PayloadAction<{ counterId: string }>) => {
			const { counterId } = action.payload

			if (!state[counterId]) {
				state[counterId] = initialCounterState
			}

			state[counterId].counter++
		},

		decrement: (state, action: PayloadAction<{ counterId: string }>) => {
			const { counterId } = action.payload

			if (!state[counterId]) {
				state[counterId] = initialCounterState
			}

			state[counterId].counter--
		}
	},
	selectors: {
		counter: (state, counterId) => state[counterId]?.counter
	}
})
