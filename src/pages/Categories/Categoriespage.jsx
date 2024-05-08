import { useSelector } from 'react-redux';
import styles from './cat.module.scss';

import { Link } from 'react-router-dom';
import { Nav } from '../../components/Nav/Nav';
import { BannerDefault } from '../../components/BannerDefault';
import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';
import { api_server } from '../../main';
import axios from 'axios';
import { CategoryCard } from './CategoryCard';

export const Categoriespage = () => {
	const products = useSelector((state) => state.products.productsList);
	const [pickedCategory, setPickedCategory] = useState(null);
	const [categories, setCategories] = useState(['', '', '']);
	const [loading, setLoading] = useState(true);

	const wallet = useTonWallet();
	const { open } = useTonConnectModal();
	useEffect(() => {
		window.scrollTo(0, 0);
		axios.get(`${api_server}/api/get-categories`).then((res) => {
			setCategories(res.data);
		});
	}, []);

	useEffect(() => {
		if (categories[0] !== '') {
			setLoading(false)
		}
	}, [categories])

	useEffect(() => {
		if (pickedCategory) {
			function cats() {
				Telegram.WebApp.offEvent('backButtonClicked', cats);
				window.scrollTo(0, 0);
				setPickedCategory(null);
			}
			window.Telegram.WebApp.BackButton.show();
			Telegram.WebApp.onEvent('backButtonClicked', cats);
		} else {
			window.Telegram.WebApp.BackButton.hide();
		}
	}, [pickedCategory]);
	return (
		<div className={styles.wrapper}>
			<div className={styles.bread}>
				<Link to="/">Home</Link>
				<span></span> 
				<Link to="/categories" onClick={() => setPickedCategory(null)}>
					Categories
				</Link>

				{/* prettier-ignore */}
				{pickedCategory && (<><span></span><Link to="/categories">{pickedCategory}</Link></>)}
			</div>

			{!pickedCategory && (
				<div className={styles.catList}>
					{categories && categories.map((categoryData) => <CategoryCard key={categoryData.name} setPickedCategory={setPickedCategory} categoryData={categoryData} />)}
				</div>
			)}

			{pickedCategory && (
				<div className={styles.catalog}>
					{products.filter((item) => item.category.toLowerCase() === pickedCategory.toLowerCase()).map((data) => (
							<ProductCard data={data} />
					))}
				</div>
			)}

			{!wallet && <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>}
{/* 
			<BannerDefault
				data={{
					isClosing: true,
					title: 'Make us better',
					text: "Tell us what product you'd like to buy with crypto, and we'll add it",
					bgImageUrl: 'https://i.ibb.co/DRY8CcY/Banner-i-OS.png',
					btnText: "Let's do it",
				}}
			/> */}
			<Nav />
		</div>
	);
};
