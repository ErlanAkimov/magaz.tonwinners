import React, { useEffect, useState } from 'react';
import styles from './description.module.scss';
import Skeleton from 'react-loading-skeleton';
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
			<p className={s.skeleton_description}><Skeleton height={10} className={s.skeleton_des}/></p>
			<p className={s.skeleton_description}><Skeleton height={10} className={s.skeleton_des}/></p>
			<p className={s.skeleton_description}><Skeleton height={10} className={s.skeleton_des}/></p>
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
