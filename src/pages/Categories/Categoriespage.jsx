import { useSelector } from 'react-redux';
import styles from './cat.module.scss';

import { Link } from 'react-router-dom';
import { Nav } from '../../components/Nav/Nav';
import { BannerDefault } from '../../components/BannerDefault';
import { useState, useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';

const cats = [
	{
		image: 'https://i.ibb.co/CPQqLBc/apple.png',
		name: 'Apple',
		link: 'apple',
	},
	{
		image: 'https://i.ibb.co/FK2H0QJ/drop.png',
		name: 'Drops & Minings',
		link: 'drops-minings',
	},
	{
		image: 'https://i.ibb.co/nMYsQ6D/sneakcat.png',
		name: 'Sneakers',
		link: 'sneakers',
	},
	{
		image: 'https://i.ibb.co/NsmmbTV/wal.png',
		name: 'Cold Wallets',
		link: 'cold-wallets',
	},
	{
		image: 'https://i.ibb.co/jvmbx4g/pepe.png',
		name: 'Meme Toys',
		link: 'meme-toys',
	},
	{
		image: 'https://i.ibb.co/khjmdDt/other.png',
		name: 'Other',
		link: 'other',
	},
];

export const Categoriespage = () => {
	const products = useSelector((state) => state.products);
	const [pickedCategory, setPickedCategory] = useState(null);

	const wallet = useTonWallet();
	const { open } = useTonConnectModal();
	useEffect(() => {
		window.scrollTo(0,0)
	}, [])

	useEffect(() => {
		if (pickedCategory) {

			function cats () {
				Telegram.WebApp.offEvent('backButtonClicked', cats)
				window.scrollTo(0,0)
				setPickedCategory(null)
			}
			window.Telegram.WebApp.BackButton.show()
			Telegram.WebApp.onEvent('backButtonClicked', cats)
		} else {
			window.Telegram.WebApp.BackButton.hide()
		}
	}, [pickedCategory])
	return (
		<div className={styles.wrapper}>
			<div className={styles.bread}>
				<Link to="/">Home</Link>
				<span></span>
				<Link to="/categories" onClick={() => setPickedCategory(null)}>
					Categories
				</Link>
				{pickedCategory && (
					<>
						<span></span>
						<Link to="/categories">{pickedCategory}</Link>
					</>
				)}
			</div>
			{!pickedCategory && (
				<div className={styles.catList}>
					{cats.map((category) => {
						return (
							<div onClick={() => setPickedCategory(category.name)} key={category.name} className={styles.catCard}>
								<div className={styles.imgBlock}>
									<img src={category.image} alt="" />
								</div>
								<p className={styles.name}>{category.name}</p>
							</div>
						);
					})}
				</div>
			)}

			{pickedCategory && (
				<div className={styles.catalog}>
					{products
						.filter((item) => item.category === pickedCategory)
						.map((data) => (
								<ProductCard data={data} />
						))}
				</div>
			)}

			{!wallet && <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>}

			<BannerDefault
				data={{
					isClosing: true,
					title: 'Make us better',
					text: "Tell us what product you'd like to buy with crypto, and we'll add it",
					bgImageUrl: 'https://i.ibb.co/DRY8CcY/Banner-i-OS.png',
					btnText: "Let's do it",
				}}
			/>
			<Nav />
		</div>
	);
};
