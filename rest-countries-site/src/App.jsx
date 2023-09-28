import { useState } from 'react';
import Select from './components/Select';
import './css/App.css'
import Card from './components/Card';

function App() {
	const [selected, setSelected] = useState("afghanistan");

	return (
		<div id='main'>
			<Select
				selected={{"get":selected, "set":setSelected}}
			/>
			<Card
				selected={{"get":selected, "set":setSelected}}
			/>
		</div>
	);
}

export default App