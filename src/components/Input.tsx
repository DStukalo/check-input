import { useEffect, useState } from 'react';
import './Input.scss'

export function Input() {
	const [value, setValue] = useState('');
	const [classes, setClasses] = useState<string>('not-value')


	const regExFull = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/g;

	function isSimple(testValue: string) {
		const regExNumbers = /^(?=.*[0-9]){8,}/g;
		const regExSymbols = /^(?=.*[^\w\s]){8,}/g;
		const regExLetter = /^(?=.*[a-zA-Z]){8,}/g;

		if (regExNumbers.test(testValue)) return true
		if (regExSymbols.test(testValue)) return true
		if (regExLetter.test(testValue)) return true

		return false
	}

	function isMedium(testValue: string) {
		const numAndLetters = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/g
		const numAndSymbols = /^(?=.*[0-9])(?=.*[^\w\s]).{8,}/g
		const lettersAndSymbols = /^(?=.*[a-zA-Z])(?=.*[^\w\s]){8,}/g;

		if (numAndLetters.test(testValue)) return true
		if (numAndSymbols.test(testValue)) return true
		if (lettersAndSymbols.test(testValue)) return true

		return false
	}

	const onChange = (e: React.SyntheticEvent<EventTarget>) => {
		setValue((e.target as HTMLInputElement).value);
		if ((e.target as HTMLInputElement).value.length === 0) {
			setClasses('not-value');
			return
		}
		if ((e.target as HTMLInputElement).value.length > 7) {
			if (regExFull.test((e.target as HTMLInputElement).value)) {
				setClasses('complex');
			} else if (isMedium((e.target as HTMLInputElement).value)) {
				setClasses('medium');
			} else if (isSimple((e.target as HTMLInputElement).value)) {
				setClasses('simple');
			}
		} else {
			setClasses('incorrect-length');
		}
	};


	return (
		<section className='check-input'>
			<form className='form'>
				<input
					className='form__input'
					type="password"
					name="password"
					id="password"
					value={value}
					onChange={onChange} />
			</form>
				<div className={`${classes} indicator`}>
					<div className='block1 indicator__item' />
					<div className='block2 indicator__item' />
					<div className='block3 indicator__item' />
			</div>
		</section>
	)
}