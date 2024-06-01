import React, { useEffect, useState } from 'react';
import styles from './description.module.scss';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import s from '../skeleton/skeletonProduct.module.scss'

export const Description: React.FC<{ text: string, loading: boolean }> = ({ text, loading }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setIsOpen(true);
	};

	useEffect(() => setIsOpen(false), [text]);

	return (
		<div className={styles.wrapper}>
			<h3>Description</h3>
			{loading ? (
			<>
			 	<div className={s.skeleton_description}><Skeleton count={3}/></div>
			</>) : (
				<p className={`${styles.description} ${isOpen ? styles.opened : null}`} dangerouslySetInnerHTML={{__html: text}} />
			)}
			{!isOpen && (
				<div className={styles.readmore} onClick={handleOpen}>
					Read more
				</div>
			)}
		</div>
	);
};
