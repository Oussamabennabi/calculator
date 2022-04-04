import React, { useReducer, useContext } from 'react';

const ThemeContext = React.createContext();
const UpdateThemeContext = React.createContext();

const ACTIONS = {
	DEFAULT_THEME: 'DEFAULT-THEME',
	WHITE_THEME: 'WHITE-THEME',
	DARK_PURPLE_THEME: 'DARK-PURPLE-THEME',
};

export function Theme() {
	return useContext(ThemeContext);
}
export function UpdateTheme() {
	return useContext(UpdateThemeContext);
}

function reducer(theme, action) {
	switch (action) {
		case ACTIONS.DEFAULT_THEME:
			return '';

		case ACTIONS.WHITE_THEME:
			return ACTIONS.WHITE_THEME;

		case ACTIONS.DARK_PURPLE_THEME:
			return ACTIONS.DARK_PURPLE_THEME;
		default:
			return '';
	}
}

export function ThemeProvider({ children }) {
	const [theme, dispatch] = useReducer(reducer, '');
	//change the body style :
	document.body.style.backgroundColor =
		theme === 'WHITE-THEME'
			? 'hsl(0, 0%, 90%)'
			: theme === 'DARK-PURPLE-THEME'
			? 'hsl(268, 75%, 9%)'
			: '';

	function handleClick(e) {
		if (e.target.classList.contains('toggle-theme')) return; // it means if we press the button
		const spans = document
			.querySelector('.toggletheme-container')
			.querySelectorAll('.circle');

		spans.forEach((span) => span.classList.add('hidden'));
		e.target.classList.remove('hidden');

		switch (e.target.id) {
			case '1':
				dispatch(ACTIONS.DEFAULT_THEME);
				break;
			case '2':
				dispatch(ACTIONS.WHITE_THEME);
				break;
			case '3':
				dispatch(ACTIONS.DARK_PURPLE_THEME);
				break;
			default:
				break;
		}
	}

	return (
		<ThemeContext.Provider value={theme}>
			<UpdateThemeContext.Provider value={handleClick}>
				{children}
			</UpdateThemeContext.Provider>
		</ThemeContext.Provider>
	);
}
