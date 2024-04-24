import { useState } from 'react'
import styles from './input.module.scss'

export const Input = ({ prop }) => {

	const handleChange = (e) => {
		prop.setValue(e.target.value)
	}

	return (
		<div className={styles.wrapper}>
			<input value={prop.value} onChange={handleChange} placeholder={prop.place} type="text" className={styles.input} />
		</div>
	)
}