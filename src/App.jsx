import React from 'react';
import './styles/styles.css';

import Calculator from './components/Calculator';
import { ThemeProvider } from './Helpers/ThemeContext';

export default function App() {
	return (
		<>
			<ThemeProvider>
				<Calculator />
			</ThemeProvider>
		</>
	);
}
