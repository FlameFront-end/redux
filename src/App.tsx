import { Counters } from './compoenents/Counters.tsx'
import { UsersList } from './compoenents/UsersList.tsx'

function App() {
	return (
		<div className='container p-5 flex flex-col gap-5'>
			<Counters />
			<UsersList />
		</div>
	)
}

export default App
