import { useEffect, useRef, useState } from 'react';
import styles from './productpage.module.scss';

import { useTonWallet, useTonConnectModal, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { beginCell, toNano } from '@ton/ton';

import { DeliveryToggler } from '../../components/DeliveryToggler';
import { ButtonDefault } from '../../components/ButtonDefault';
import { Slider } from './Slider';
import axios from 'axios';
import { api_server } from '../../main';
import { Nav } from '../../components/Nav/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { changeNeedDelivery } from '../../redux/slice/cartSlice';
import { DeliveryInfo } from '../../components/DeliveryInfo';
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
	const productInCart = useSelector(state => state.user.cart.filter(item => item._id === productId)[0]?.counter);
	useEffect(() => {console.log(productInCart)}, [user])
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

	const finallyButton = () => {
		if (!wallet) {
			open();
			return;
		}

		if (readyToBuy) {
			buy();
		}

		if (!readyToBuy) {
			handleOrderDetailsControl(true);
		}
	};

	// Управление инпутом ввода количества товара
	const handleChangeAmount = (e) => {
		const inputValue = e.target.value;
		const numericRegex = /^[0-9]*$/; // Регулярное выражение, позволяющее только цифры

		if (!numericRegex.test(inputValue)) {
			// Если ввод не является числом, не обрабатываем его
			return;
		}

		// Если ввод является числом, обрабатываем его
		setOrderAmount(inputValue);

		if (inputValue < 1 && inputValue !== '') {
			setOrderAmount(1);
		}

		if (inputValue > productData.total - productData.sold) {
			setOrderAmount(productData.total - productData.sold);
		}
	};
	const handleChangeAmountOnBlur = (e) => {
		if (e.target.value === '') {
			setOrderAmount(1);
		}
	};

	// Упраление ползунком количества товара
	const handleMouseDown = () => {
		setIsDragging(true);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e) => {
		if (isDragging) {
			setOrderAmount(e.target.value);
		}
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

						{productData.deliveryFee && (
							<div className={styles.delInfo} style={{ color: productData.deliveryFee > 0 ? '#EDA44E' : '#808080' }}>
								<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M6.87606 6.65596L7.21939 7.89796C7.54273 9.06796 7.70406 9.65329 8.17939 9.91929C8.65473 10.186 9.25806 10.0286 10.4647 9.71529L11.7447 9.38196C12.9514 9.06862 13.5547 8.91196 13.8294 8.45129C14.1041 7.98996 13.9427 7.40462 13.6187 6.23462L13.2761 4.99329C12.9527 3.82262 12.7907 3.23729 12.3161 2.97129C11.8401 2.70462 11.2367 2.86196 10.0301 3.17596L8.75006 3.50796C7.54339 3.82129 6.94006 3.97862 6.66606 4.43996C6.39139 4.90062 6.55273 5.48596 6.87606 6.65596Z"
										fill={productData.deliveryFee > 0 ? '#EDA44E' : '#808080'}
									/>
									<path
										d="M2.018 4.33394C2.03557 4.27062 2.06544 4.21138 2.10591 4.15962C2.14638 4.10786 2.19666 4.06458 2.25387 4.03226C2.31108 3.99994 2.3741 3.97921 2.43933 3.97126C2.50455 3.96331 2.57071 3.9683 2.634 3.98594L3.76934 4.3006C4.07023 4.38232 4.34482 4.5406 4.56634 4.76002C4.78786 4.97944 4.94875 5.2525 5.03334 5.5526L6.46734 10.7433L6.57267 11.1079C6.99784 11.2646 7.35612 11.5629 7.58734 11.9526L7.794 11.8886L13.7073 10.3519C13.7709 10.3354 13.8371 10.3315 13.9021 10.3406C13.9672 10.3496 14.0298 10.3714 14.0865 10.4046C14.1431 10.4378 14.1927 10.4819 14.2323 10.5343C14.2719 10.5867 14.3008 10.6464 14.3173 10.7099C14.3339 10.7735 14.3377 10.8397 14.3287 10.9047C14.3197 10.9698 14.2979 11.0324 14.2647 11.0891C14.2314 11.1457 14.1874 11.1953 14.135 11.2349C14.0826 11.2745 14.0229 11.3034 13.9593 11.3199L8.068 12.8506L7.848 12.9186C7.844 13.7653 7.25934 14.5399 6.37467 14.7693C5.31467 15.0453 4.22467 14.4346 3.94067 13.4066C3.65667 12.3779 4.286 11.3206 5.346 11.0453C5.39823 11.0318 5.45093 11.0202 5.504 11.0106L4.06934 5.8186C4.03072 5.68521 3.95823 5.56409 3.85893 5.46701C3.75963 5.36993 3.6369 5.3002 3.50267 5.2646L2.36667 4.94927C2.30337 4.93177 2.24413 4.90197 2.19234 4.86158C2.14056 4.82118 2.09724 4.77098 2.06486 4.71383C2.03248 4.65669 2.01168 4.59373 2.00364 4.52855C1.9956 4.46336 2.00048 4.39723 2.018 4.33394Z"
										fill={productData.deliveryFee > 0 ? '#EDA44E' : '#808080'}
									/>
								</svg>

								{productData.deliveryFee > 0 ? `Delivery cost: ${productData.deliveryFee} TON` : 'CIS Free Delivery'}
							</div>
						)}
					</div>

					<button className={styles.orderNow} onClick={(e) => {
						if (productInCart > 0) {
							navigate('/orders')
							return
						}

						dispatch(addToCart(productData))
						navigate('/orders')
					}}>
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

				<DeliveryToggler handleModalControl={handleModalControl} />

				{/* <Modal zIndex={300} modalTitle={'Shipping Details'} handleModalControl={handleModalControl} modal={modal}>
					<DeliveryInfo setIsOpen={handleModalControl} styles={styles} isOpen={modal} />
				</Modal>

				<Modal zIndex={200} modalTitle={'Order Details'} handleModalControl={handleOrderDetailsControl} modal={orderDetailsModal}>
					{needDelivery ? (
						<div className={styles.details} style={{ marginBottom: 30 }}>
							<p className={styles.formSubtitle}>customer and address info</p>
							<div className={styles.formInfo}>
								<div className={styles.orderDetail}>
									<div className={styles.orderDetailIcon}>
										<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M10 2.574C7.91479 2.574 6.29049 4.19466 6.29049 6.11377C6.29049 8.03288 7.91479 9.65354 10 9.65354C12.0852 9.65354 13.7095 8.03288 13.7095 6.11377C13.7095 4.19466 12.0852 2.574 10 2.574ZM4.17252 6.11377C4.17252 2.95323 6.81808 0.456024 10 0.456024C13.1819 0.456024 15.8275 2.95323 15.8275 6.11377C15.8275 9.27431 13.1819 11.7715 10 11.7715C6.81808 11.7715 4.17252 9.27431 4.17252 6.11377ZM10 15.7954C3.83306 15.7954 2.25174 19.2504 2.11241 20.5941C2.05209 21.1759 1.53159 21.5985 0.949849 21.5382C0.368106 21.4779 -0.0545901 20.9574 0.00573137 20.3757C0.26378 17.887 2.81516 13.6775 10 13.6775C17.1848 13.6775 19.7362 17.887 19.9943 20.3757C20.0546 20.9574 19.6319 21.4779 19.0502 21.5382C18.4684 21.5985 17.9479 21.1759 17.8876 20.5941C17.7483 19.2504 16.1669 15.7954 10 15.7954Z"
												fill="#007AFF"
											/>
										</svg>
									</div>
									<div>{user.deliveryInfo.name}</div>
								</div>
								<div className={styles.orderDetail}>
									<div className={styles.orderDetailIcon}>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M2.42578 9.19891C2.15849 10.0872 2.01507 11.0274 2.01507 12C2.01507 12.9726 2.15849 13.9129 2.42578 14.8011H6.78745C6.68029 13.9357 6.62102 13.0028 6.62102 12C6.62102 10.9972 6.68029 10.0644 6.78745 9.19891H2.42578ZM3.27046 7.22033H7.13764C7.60131 5.24136 8.32863 3.70819 9.11668 2.57575C6.60846 3.31974 4.51942 5.00925 3.27046 7.22033ZM12 2.33916C11.172 2.97703 9.90562 4.48617 9.17459 7.22033H14.8254C14.0943 4.48617 12.828 2.97703 12 2.33916ZM15.2187 9.19891H8.78125C8.66567 10.0445 8.59959 10.9762 8.59959 12C8.59959 13.0239 8.66567 13.9556 8.78125 14.8011H15.2187C15.3343 13.9556 15.4004 13.0239 15.4004 12C15.4004 10.9762 15.3343 10.0445 15.2187 9.19891ZM17.2125 14.8011C17.3197 13.9357 17.379 13.0028 17.379 12C17.379 10.9972 17.3197 10.0644 17.2125 9.19891H21.5748C21.8415 10.0858 21.9849 11.0257 21.9849 12C21.9849 12.9743 21.8415 13.9142 21.5748 14.8011H17.2125ZM14.8254 16.7797H9.17459C9.90562 19.5139 11.172 21.023 12 21.6609C12.828 21.023 14.0943 19.5139 14.8254 16.7797ZM9.11668 21.4243C8.32863 20.2918 7.60131 18.7587 7.13764 16.7797L3.27046 16.7797C4.51942 18.9908 6.60846 20.6803 9.11668 21.4243ZM14.8835 21.424C15.6715 20.2915 16.3987 18.7585 16.8623 16.7797H20.7302C19.4811 18.9906 17.391 20.6798 14.8835 21.424ZM20.7302 7.22033H16.8623C16.3987 5.24154 15.6715 3.70848 14.8835 2.57607C17.391 3.32018 19.4811 5.00941 20.7302 7.22033ZM0.036499 12C0.036499 5.46025 5.40514 0.18103 12 0.18103C17.1277 0.18103 21.5083 3.3695 23.2084 7.85929C23.6968 9.14906 23.9635 10.5448 23.9635 12C23.9635 13.4552 23.6968 14.851 23.2084 16.1407C21.5083 20.6305 17.1277 23.819 12 23.819C5.40514 23.819 0.036499 18.5398 0.036499 12Z"
												fill="#007AFF"
											/>
										</svg>
									</div>
									<div>{`${user.deliveryInfo.country}${user.deliveryInfo.country && ','} ${user.deliveryInfo.state}${
										user.deliveryInfo.state && ','
									} ${user.deliveryInfo.city}${user.deliveryInfo.city && ','} ${user.deliveryInfo.street}`}</div>
								</div>
								<div className={styles.orderDetail}>
									<div className={styles.orderDetailIcon}>
										<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M9.21431 2.59507C8.88289 2.59507 8.61423 2.86374 8.61423 3.19515V3.51847H9.81439V3.19516C9.81439 2.86374 9.54572 2.59507 9.21431 2.59507ZM11.6144 3.51847V3.19516C11.6144 1.86963 10.5398 0.795074 9.21431 0.795074C7.88878 0.795074 6.81423 1.86963 6.81423 3.19515V3.51847H5.11937C2.74153 3.51847 0.813904 5.4461 0.813904 7.82394V16.8995C0.813904 19.2773 2.74153 21.2049 5.11938 21.2049H12.8807C15.2585 21.2049 17.1861 19.2773 17.1861 16.8995V7.82394C17.1861 5.44609 15.2585 3.51847 12.8807 3.51847H11.6144ZM5.11937 5.31847C3.73564 5.31847 2.6139 6.44021 2.6139 7.82394V16.8995C2.6139 18.2832 3.73564 19.4049 5.11938 19.4049H12.8807C14.2644 19.4049 15.3861 18.2832 15.3861 16.8995V7.82394C15.3861 6.4402 14.2644 5.31847 12.8807 5.31847H5.11937ZM4.67126 8.50356C4.67126 8.0065 5.0742 7.60356 5.57126 7.60356H12.4288C12.9258 7.60356 13.3288 8.0065 13.3288 8.50356C13.3288 9.00061 12.9258 9.40356 12.4288 9.40356H5.57126C5.0742 9.40356 4.67126 9.00061 4.67126 8.50356ZM4.67126 11.6808C4.67126 11.1838 5.0742 10.7808 5.57126 10.7808H12.4288C12.9258 10.7808 13.3288 11.1838 13.3288 11.6808C13.3288 12.1779 12.9258 12.5808 12.4288 12.5808H5.57126C5.0742 12.5808 4.67126 12.1779 4.67126 11.6808ZM5.95704 14.8581C5.95704 14.3611 6.35998 13.9581 6.85704 13.9581H11.143C11.64 13.9581 12.043 14.3611 12.043 14.8581C12.043 15.3552 11.64 15.7581 11.143 15.7581H6.85704C6.35998 15.7581 5.95704 15.3552 5.95704 14.8581Z"
												fill="#007AFF"
											/>
										</svg>
									</div>
									<div>{user.deliveryInfo.zipcode}</div>
								</div>
							</div>

							<p className={styles.correct}>Please double-check your address. If it's incorrect, we can't deliver your product</p>
						</div>
					) : (
						<div className={styles.details}>
							<div className={styles.banana}>
								<img src="https://i.ibb.co/YtW140P/Image.png" alt="" />
							</div>

							<Quote
								lineColor={'rgba(229, 57, 53, 1)'}
								bgColor={'rgba(255, 32, 32, 0.1)'}
								text="You are going to order a product without delivery. This is fine if you only want to receive DROPS. However, if you also want 
the souvenir, please enable delivery
and provide your details."
							/>
							<div style={{ padding: '0px', marginTop: 10 }} className={styles.deliveryFee}>
								<DeliveryToggler handleModalControl={handleModalControl} marginTop={'0px'} />
							</div>
						</div>
					)}
					<div className={styles.details} style={{ paddingBottom: 50 }}>
						<p className={styles.formSubtitle}>order amount</p>
						<div className={styles.amount}>
							<input
								className={styles.inputRange}
								onChange={handleChangeAmount}
								onMouseDown={handleMouseDown}
								onMouseUp={handleMouseUp}
								onMouseMove={handleMouseMove}
								min={1}
								max={productData.total - productData.sold}
								value={orderAmount}
								step={1}
								type="range"
							/>
							<input
								className={styles.amountInput}
								type="tel"
								value={orderAmount}
								onBlur={handleChangeAmountOnBlur}
								onChange={handleChangeAmount}
							/>
						</div>

						{needDelivery && (
							<>
								<div className={styles.deliveryFee}>
									<div>
										<h4>Delivery Fee</h4>
										<button onClick={(e) => dispatch(changeNeedDelivery(false))} className={styles.delete}>
											<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M0.725282 1.04028C1.08376 0.681803 1.66498 0.681803 2.02346 1.04028L6.88206 5.89889L11.7407 1.04028C12.0991 0.681803 12.6804 0.681803 13.0388 1.04028C13.3973 1.39877 13.3973 1.97998 13.0388 2.33846L8.18024 7.19706L13.0388 12.0557C13.3973 12.4142 13.3973 12.9954 13.0388 13.3538C12.6804 13.7123 12.0991 13.7123 11.7407 13.3538L6.88206 8.49524L2.02346 13.3538C1.66498 13.7123 1.08376 13.7123 0.725282 13.3538C0.366801 12.9954 0.366801 12.4142 0.725282 12.0557L5.58389 7.19706L0.725282 2.33846C0.366801 1.97998 0.366801 1.39877 0.725282 1.04028Z"
													fill="white"
												/>
											</svg>

											<p>Cancel Delivery</p>
										</button>
									</div>
									<p className={styles.fee}>{productData.deliveryFee} TON</p>
								</div>
							</>
						)}

						<p className={styles.formSubtitle}>you're paying:</p>
						<div className={styles.deliveryFee}>
							<div className={styles.leftside}>
								<p>{`${orderAmount} ITEMS`}</p>
								<p>FOR</p>
							</div>

							<div className={styles.rightside}>
								<p>{totalAmount}</p>
								<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_189_7473)">
										<path
											d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95429 31.0457 0 20 0C8.95429 0 0 8.95429 0 20C0 31.0457 8.95429 40 20 40Z"
											fill="#0098EA"
										/>
										<path
											d="M26.8288 11.1627H13.1705C10.6592 11.1627 9.06745 13.8716 10.3309 16.0615L18.7603 30.6721C19.3104 31.6261 20.6889 31.6261 21.239 30.6721L29.6701 16.0615C30.9318 13.8751 29.3401 11.1627 26.8305 11.1627H26.8288ZM18.7535 26.2906L16.9177 22.7377L12.4881 14.8153C12.1959 14.3082 12.5568 13.6584 13.1687 13.6584H18.7517V26.2923L18.7535 26.2906ZM27.5077 14.8136L23.0799 22.7394L21.2441 26.2906V13.6567H26.8271C27.439 13.6567 27.8 14.3065 27.5077 14.8136Z"
											fill="white"
										/>
									</g>
									<defs>
										<clipPath id="clip0_189_7473">
											<rect width="40" height="40" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
					</div>
				</Modal> */}

				{/* Counter для количества товаров в корзине */}
				{productInCart > 0 ? (
					<div className={styles.cartButton}>
						<button onClick={() => {dispatch(removeFromCart(productData))}}>
							<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect x="0.5" width="24" height="24" rx="12" fill="white" />
								<path d="M14.4702 11.668V13.1987H10.4639V11.668H14.4702Z" fill="#12AC58" />
							</svg>
						</button>
						<p onClick={() => navigate('/orders')} className={styles.counter}>{user.appLanguage === 'ru' ? 'Штук заказать: ' : 'Pieces to order: '}{productInCart}</p>
						<button onClick={() => {dispatch(addToCart(productData))}}>
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
					<ButtonDefault propStyles={{ display: 'block', zIndex: readyToBuy && !modal ? 500 : 100 }} marginTop={20} onClick={() => {wallet ? dispatch(addToCart(productData)) : open()}}>
						{wallet ? 'Buy Product' : 'Connect Wallet'}
					</ButtonDefault>
				)}
			</div>
			<Nav />
		</div>
	);
}
export default Productpage;
