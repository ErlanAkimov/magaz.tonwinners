import { useEffect, useRef, useState } from 'react';
import styles from './productpage.module.scss';

import { useTonWallet, useTonConnectModal, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { beginCell, toNano } from '@ton/ton';

import { ButtonDefault } from '../../components/ButtonDefault';
import { Slider } from './Slider';
import axios from 'axios';
import { api_server } from '../../main';
import { Nav } from '../../components/Nav/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { changeNeedDelivery } from '../../redux/slice/cartSlice';
import { deliveryInfoModalController } from '../../redux/slice/applicationState';
import { addToCart, pushWallet, removeFromCart } from '../../redux/slice/userSlice';
import { BannerDefault } from '../../components/BannerDefault';
import { SwiperSlide, Swiper } from 'swiper/react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useNavigate, useParams } from 'react-router-dom';

function Productpage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const products = useSelector((state) => state.products.productsList);
	const { productId } = useParams();
	const productData = useSelector((state) => state.products.productsList.filter((a) => a._id === productId)[0]);
	const productInCart = useSelector((state) => state.user.cart.filter((item) => item._id === productId)[0]?.counter);
	useEffect(() => {
		console.log(productInCart);
	}, [user]);
	useEffect(() => window.scrollTo(0, 0), [productId]);

	const wallet = useTonWallet();
	const friendlyAddress = useTonAddress();

	const [tonConnectUI] = useTonConnectUI();

	const { open } = useTonConnectModal();
	const [modal, setModal] = useState(false);
	const [orderDetailsModal, setOrderDetailsModal] = useState(false);
	const needDelivery = useSelector((state) => state.cart.needDelivery);

	const [totalAmount, setTotalAmount] = useState(5);
	const [isDragging, setIsDragging] = useState(false);
	const [orderAmount, setOrderAmount] = useState(1);
	const [readyToBuy, setReadyToBuy] = useState(false);
	const wrapperRef = useRef(null);

	const buy = async () => {
		const date = Math.floor(Date.now() / 1000);
		let orderData = {
			user: user.id,
			username: user.username,
			friendlyAddress,
			address: wallet.account.address,
			date,
			status: 'created',
			needDelivery,
			orderAmount: parseInt(orderAmount),
			name: productData.name,
			productId: productData._id,
			productPrice: parseInt(productData.price),
			marker: `${date}-${wallet.account.address}`,
		};

		if (needDelivery) {
			orderData = {
				...orderData,
				deliveryData: {
					name: user.deliveryInfo.name,
					country: user.deliveryInfo.country,
					state: user.deliveryInfo.state,
					city: user.deliveryInfo.city,
					street: user.deliveryInfo.street,
					zipcode: user.deliveryInfo.zipcode,
				},
			};
		}

		const body = beginCell().storeUint(0, 32).storeStringTail(`${date}-${wallet.account.address}`).endCell();
		const total = parseInt(productData.price) * parseInt(orderAmount) + (needDelivery ? parseInt(productData.deliveryFee) : 0);
		const transaction = {
			validUntil: date + 18000,
			messages: [
				{
					address: 'UQBMRxDpMjC8Q6XYwzqXdyoOmSBB0IgkaOvburVgfZ6kh2Fx',
					amount: String(total * 10 ** 9),
					payload: body.toBoc().toString('base64'),
				},
			],
		};
		axios.post(`${api_server}/api/trashBank`, { ...orderData });
		tonConnectUI.sendTransaction(transaction).then((res) => {
			if (res.boc) {
				axios.post(`${api_server}/api/new-order`, { ...orderData, boc: res.boc });
			}
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		tonConnectUI.uiOptions = {
			actionsConfiguration: {
				modals: ['before', 'success', 'error'],
				notifications: ['before', 'success', 'error'],
			},
		};

		const gohome = () => {
			Telegram.WebApp.onEvent('backButtonClicked', gohome);
			navigate('/');
		};
		window.Telegram.WebApp.BackButton.show();
		Telegram.WebApp.onEvent('backButtonClicked', gohome);
	}, []);

	useEffect(() => {
		if (friendlyAddress && !user.wallets.includes(friendlyAddress)) {
			dispatch(pushWallet(friendlyAddress));
		}
	}, [friendlyAddress]);

	// Управление модальными окнами
	const handleModalControl = (bool) => {
		// Отключаем скроллинг документа если модальное окно открыто
		bool ? (document.body.style.overflow = 'hidden') : orderDetailsModal ? null : (document.body.style.overflow = 'initial');
		if (
			(!bool && user.deliveryInfo.name === '') ||
			user.deliveryInfo.country === '' ||
			user.deliveryInfo.state === '' ||
			user.deliveryInfo.city === '' ||
			user.deliveryInfo.street === '' ||
			user.deliveryInfo.zipcode === ''
		) {
			dispatch(changeNeedDelivery(false));
		}
		dispatch(deliveryInfoModalController(bool));
		setModal(bool);
	};
	const handleOrderDetailsControl = (bool) => {
		// Отключаем скроллинг документа если модальное окно открыто
		bool ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'initial');
		setReadyToBuy(bool);
		setOrderDetailsModal(bool);
	};

	useEffect(() => {
		let total = orderAmount * productData.price;
		if (needDelivery) {
			total = total + parseInt(productData.deliveryFee);
		}

		setTotalAmount(total);
	}, [orderAmount, productData.price, needDelivery]);

	return (
		<div ref={wrapperRef} className={styles.wrapper}>
			<Slider productData={productData} />
			<div className="wrapper">
				<div className={styles.title}>
					<div>
						<h1>{productData.name}</h1>
					</div>

					<p className={styles.magaz}>magaz</p>
				</div>
				<div className={styles.priceLine}>
					<div>
						<div className={styles.price}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0ZM6.585 5.58083H13.415C14.6692 5.58083 15.4667 6.9375 14.8358 8.03083L10.62 15.335C10.557 15.4436 10.4666 15.5338 10.3578 15.5965C10.249 15.6592 10.1256 15.6922 10 15.6922C9.87442 15.6922 9.75104 15.6592 9.64223 15.5965C9.53342 15.5338 9.44299 15.4436 9.38 15.335L5.16583 8.03083C4.53417 6.93583 5.33 5.58083 6.585 5.58083ZM10.6217 6.8275V13.1442L11.54 11.3708L13.7533 7.4075C13.7872 7.3483 13.8049 7.2812 13.8045 7.21299C13.8042 7.14478 13.7858 7.07786 13.7513 7.01902C13.7168 6.96017 13.6674 6.91147 13.6081 6.87784C13.5487 6.84421 13.4815 6.82685 13.4133 6.8275H10.6217ZM6.58333 6.82917C6.51527 6.82843 6.44821 6.84567 6.38895 6.87915C6.32968 6.91263 6.28031 6.96117 6.24581 7.01985C6.21131 7.07853 6.19292 7.14527 6.19248 7.21334C6.19205 7.28141 6.20959 7.34838 6.24333 7.4075L8.45833 11.3692L9.37667 13.1442V6.82917H6.58333Z"
									fill="#06A5FF"
								/>
							</svg>
							{productData.price} TON
						</div>

						<div className={styles.delInfo} style={{ color: productData.deliveryFee > 0 ? '#EDA44E' : '#808080' }}>
							<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.87606 6.65596L7.21939 7.89796C7.54273 9.06796 7.70406 9.65329 8.17939 9.91929C8.65473 10.186 9.25806 10.0286 10.4647 9.71529L11.7447 9.38196C12.9514 9.06862 13.5547 8.91196 13.8294 8.45129C14.1041 7.98996 13.9427 7.40462 13.6187 6.23462L13.2761 4.99329C12.9527 3.82262 12.7907 3.23729 12.3161 2.97129C11.8401 2.70462 11.2367 2.86196 10.0301 3.17596L8.75006 3.50796C7.54339 3.82129 6.94006 3.97862 6.66606 4.43996C6.39139 4.90062 6.55273 5.48596 6.87606 6.65596Z"
									fill={'#EDA44E'}
								/>
								<path
									d="M2.018 4.33394C2.03557 4.27062 2.06544 4.21138 2.10591 4.15962C2.14638 4.10786 2.19666 4.06458 2.25387 4.03226C2.31108 3.99994 2.3741 3.97921 2.43933 3.97126C2.50455 3.96331 2.57071 3.9683 2.634 3.98594L3.76934 4.3006C4.07023 4.38232 4.34482 4.5406 4.56634 4.76002C4.78786 4.97944 4.94875 5.2525 5.03334 5.5526L6.46734 10.7433L6.57267 11.1079C6.99784 11.2646 7.35612 11.5629 7.58734 11.9526L7.794 11.8886L13.7073 10.3519C13.7709 10.3354 13.8371 10.3315 13.9021 10.3406C13.9672 10.3496 14.0298 10.3714 14.0865 10.4046C14.1431 10.4378 14.1927 10.4819 14.2323 10.5343C14.2719 10.5867 14.3008 10.6464 14.3173 10.7099C14.3339 10.7735 14.3377 10.8397 14.3287 10.9047C14.3197 10.9698 14.2979 11.0324 14.2647 11.0891C14.2314 11.1457 14.1874 11.1953 14.135 11.2349C14.0826 11.2745 14.0229 11.3034 13.9593 11.3199L8.068 12.8506L7.848 12.9186C7.844 13.7653 7.25934 14.5399 6.37467 14.7693C5.31467 15.0453 4.22467 14.4346 3.94067 13.4066C3.65667 12.3779 4.286 11.3206 5.346 11.0453C5.39823 11.0318 5.45093 11.0202 5.504 11.0106L4.06934 5.8186C4.03072 5.68521 3.95823 5.56409 3.85893 5.46701C3.75963 5.36993 3.6369 5.3002 3.50267 5.2646L2.36667 4.94927C2.30337 4.93177 2.24413 4.90197 2.19234 4.86158C2.14056 4.82118 2.09724 4.77098 2.06486 4.71383C2.03248 4.65669 2.01168 4.59373 2.00364 4.52855C1.9956 4.46336 2.00048 4.39723 2.018 4.33394Z"
									fill={'#EDA44E'}
								/>
							</svg>

							{user.appLanguage === 'ru' ? `Бесплатная доставка` : 'Free Delivery'}
						</div>
					</div>

					<button
						className={styles.orderNow}
						onClick={(e) => {
							if (productInCart > 0) {
								navigate('/orders');
								return;
							}

							dispatch(addToCart(productData));
							navigate('/orders');
						}}
					>
						Order Now
					</button>
				</div>
				<div className={styles.productInfo}>
					<div>
						<p>{productData.sold}</p>
						<p>Items Sold</p>
					</div>
					<div>
						<p>
							{productData.deliverMin} to {productData.deliverMax}
						</p>
						<p>Weeks Arrival</p>
					</div>
				</div>
				<div className={styles.description}>
					<h3>Description</h3>
					{productData.description && <p dangerouslySetInnerHTML={{ __html: productData.description.replace(/\n/g, '<br />') }} />}
				</div>
				<div className={styles.properties}>
					{productData.properties &&
						productData.properties.map((propertyData, index) => {
							return (
								<div key={index}>
									<p>{Object.values(propertyData)}</p>
									<p>{Object.keys(propertyData)}</p>
								</div>
							);
						})}
				</div>

				<BannerDefault
					data={{
						title: 'Global Delivery',
						text: 'We take advantage of the best opportunities to deliver your packages as quickly as possible',
						btnText: 'Order Now',
						bgImageUrl: 'https://i.ibb.co/JvM4V7k/world.png',
					}}
				/>

				<div className={styles.productLine}>
					<h4 className={styles.prodTitle}>Same products</h4>
					<Swiper spaceBetween={8} slidesPerView={2} className={styles.productLineSwiper}>
						{products.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductCard data={product} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className={styles.productLine}>
					<h4 className={styles.prodTitle}>Recommended for you</h4>
					<Swiper spaceBetween={8} slidesPerView={2} className={styles.productLineSwiper}>
						{products.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductCard data={product} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className={styles.productLine}>
					<h4 className={styles.prodTitle}>From this seller</h4>
					<Swiper spaceBetween={8} slidesPerView={2} className={styles.productLineSwiper}>
						{products.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductCard data={product} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* Counter для количества товаров в корзине */}
				{productInCart > 0 ? (
					<div className={styles.cartButton}>
						<button
							onClick={() => {
								dispatch(removeFromCart(productData));
							}}
						>
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" width="24" height="24" rx="12" fill="white" />
								<path d="M14.4702 11.668V13.1987H10.4639V11.668H14.4702Z" fill="#12AC58" />
							</svg>
						</button>
						<p onClick={() => navigate('/orders')} className={styles.counter}>
							{user.appLanguage === 'ru' ? 'Штук заказать: ' : 'Pieces to order: '}
							{productInCart}
						</p>
						<button
							onClick={() => {
								dispatch(addToCart(productData));
							}}
						>
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" width="24" height="24" rx="12" fill="white" />
								<path
									d="M16.1328 11.104V12.8252H8.82324V11.104H16.1328ZM13.4082 8.16699V15.9307H11.5552V8.16699H13.4082Z"
									fill="#12AC58"
								/>
							</svg>
						</button>
					</div>
				) : (
					<ButtonDefault
						propStyles={{ display: 'block', zIndex: readyToBuy && !modal ? 500 : 100 }}
						marginTop={20}
						onClick={() => {
							wallet ? dispatch(addToCart(productData)) : open();
						}}
					>
						{wallet ? 'Buy Product' : 'Connect Wallet'}
					</ButtonDefault>
				)}
			</div>
			<Nav />
		</div>
	);
}
export default Productpage;
