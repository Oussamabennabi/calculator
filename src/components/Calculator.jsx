import React, { useReducer } from 'react';
import { UpdateTheme, Theme } from '../Helpers/ThemeContext';
import DigitButton from './Buttons/DigitButton';
import OperationButton from './Buttons/OperationButton';

export const ACTIONS = {
	ADD_DIGIT: 'add-digit',
	CHOOSE_OPERATION: 'choose-operation',
	DELETE_DIGIT: 'delete-digit',
	CLEAR_ALL: 'clear-all',
	EVALUAT: 'evaluat',
};

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overWrite) {
				return {
					...state,
					overWrite: false,
					currentOperand: payload.digit,
				};
			}
			if (state.currentOperand === '0' && payload.digit === '0') return state;
			if (payload.digit === '.' && String(state.currentOperand).includes('.'))
				return state;

			return {
				...state,
				currentOperand: `${state.currentOperand || ''}${payload.digit}`,
			};
		case ACTIONS.CHOOSE_OPERATION:
			state.overWrite = false;
			if (!state.currentOperand) return state;
			if (
				thereIsOperation(state.currentOperand) &&
				!Number(state.currentOperand.slice(-1))
			) {
				return {
					...state,
					currentOperand: `${state.currentOperand}`,
				};
			}
			return {
				...state,
				currentOperand: `${state.currentOperand}${payload.operation}`,
			};
		case ACTIONS.CLEAR_ALL:
			return {
				currentOperand: '',
			};
		case ACTIONS.DELETE_DIGIT:
			return {
				...state,
				currentOperand:
					state.currentOperand && state.currentOperand.slice(0, -1),
			};
		case ACTIONS.EVALUAT:
			if (
				!state.currentOperand ||
				thereIsOperation(state.currentOperand.slice(-1))
			)
				return state;
			return {
				...state,
				overWrite: true,
				currentOperand: eval(state.currentOperand) + '',
			};

		default:
			return state;
	}
}
function thereIsOperation(expression) {
	if (
		String(expression).includes('+') ||
		String(expression).includes('-') ||
		String(expression).includes('*') ||
		String(expression).includes('/')
	)
		return true;
	return false;
}
// function evaluate({ currentOperand }, operation) {
// 	let [operand_1, operand_2] =
// 		currentOperand.split('+') ||
// 		currentOperand.split('x') ||
// 		currentOperand.split('-') ||
// 		currentOperand.split('/');

// 	operand_1 = parseFloat(operand_1);
// 	operand_2 = parseFloat(operand_2);
// 	let result = 0;
// 	console.log(`	${operand_1}    ${operand_2}`);
// 	switch (operation) {
// 		case '+':
// 			result = operand_1 + operand_2;
// 			break;

// 		case '-':
// 			result = operand_1 - operand_2;
// 			break;

// 		case 'x':
// 			result = operand_1 * operand_2;
// 			break;

// 		case '/':
// 			result = operand_1 / operand_2;
// 			break;
// 		default:
// 			return '';
// 	}
// 	console.log(result);
// 	return result+"";
// }

export default function Calculator() {
	const theme = Theme();
	const handleClick = UpdateTheme();

	const [{ currentOperand = '', operation }, dispatch] = useReducer(
		reducer,
		{}
	);
	return (
		<div className={`calculator ${theme}`}>
			<div className="calculator-header">
				<h2>calc</h2>
				<div className="toggletheme-container">
					<span>
						<small>THEME</small>
					</span>
					<button onClick={handleClick} className="toggle-theme">
						<div className="theme-numbers">
							<span>1</span>
							<span>2</span>
							<span>3</span>
						</div>
						<span id="1" className="circle "></span>
						<span id="2" className="circle hidden"></span>
						<span id="3" className="circle hidden"></span>
					</button>
				</div>
			</div>
			<div className="calculator-output">
				{currentOperand}
				{operation}
			</div>
			<div className="calculator-keypads">
				<DigitButton dispatch={dispatch} digit="7" />
				<DigitButton dispatch={dispatch} digit="8" />
				<DigitButton dispatch={dispatch} digit="9" />
				<button
					onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
					className="DEL"
				>
					DEL
				</button>
				<DigitButton dispatch={dispatch} digit="4" />
				<DigitButton dispatch={dispatch} digit="5" />
				<DigitButton dispatch={dispatch} digit="6" />
				<OperationButton dispatch={dispatch} operation="+" />
				<DigitButton dispatch={dispatch} digit="1" />
				<DigitButton dispatch={dispatch} digit="2" />
				<DigitButton dispatch={dispatch} digit="3" />
				<OperationButton dispatch={dispatch} operation="-" />
				<DigitButton dispatch={dispatch} digit="." />
				<DigitButton dispatch={dispatch} digit="0" />
				<OperationButton dispatch={dispatch} operation="/" />
				<OperationButton dispatch={dispatch} operation="*" />
				<button
					onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}
					className="span-2 RESET"
				>
					RESET
				</button>
				<button
					onClick={() => dispatch({ type: ACTIONS.EVALUAT })}
					className="span-2 EQUAL"
				>
					=
				</button>
			</div>
		</div>
	);
}
