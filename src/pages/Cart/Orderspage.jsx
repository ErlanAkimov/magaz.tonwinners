import { useDispatch, useSelector } from 'react-redux';
import { Nav } from '../../components/Nav/Nav';
import styles from './orders.module.scss';
import { emptyCart } from '../../redux/slice/userSlice';
import { useEffect } from 'react';
import cartSlice from '../../redux/slice/cartSlice';
export const Orderspage = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const cartList = useSelector((state) => state.user.cart.reduce((acc, obj) => {
		acc.map((a) => {
			
		})
		return acc
	}, []));

	useEffect(() => {
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.return} onClick={() => dispatch(emptyCart())}>
				Отменить выбор
			</div>
			{user.cart.map((item) => {
				return (
					<div className={styles.cartItem}>
						<div className={styles.topside}>
							<div className={styles.imgBlock}>
								<img src={item.images[0]} alt="" />
							</div>

							<div className={styles.central}>
								<p className={styles.title}>{item.name}</p>
								<p
									className={styles.description}
									dangerouslySetInnerHTML={{ __html: item.description.split(' ').slice(0, 16).join(' ') + '...' }}
								/>
							</div>

							<div className={styles.picker}>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M10.78 0.401998C11.2484 0.694709 11.3907 1.31166 11.098 1.78L5.47303 10.78C5.30222 11.0533 5.01018 11.2275 4.68855 11.248C4.36693 11.2684 4.05515 11.1327 3.85107 10.8832L0.476073 6.75823C0.126345 6.33079 0.189347 5.70077 0.616792 5.35104C1.04424 5.00131 1.67426 5.06431 2.02399 5.49176L4.51603 8.53759L9.40203 0.719998C9.69474 0.251661 10.3117 0.109288 10.78 0.401998Z"
										fill="white"
									/>
								</svg>
							</div>
						</div>
					</div>
				);
			})}

			<Nav />
		</div>
	);
};
