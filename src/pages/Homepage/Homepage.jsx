import { useEffect, useRef, useState } from 'react';
import styles from './homepage.module.scss';

import { useTonWallet, useTonConnectModal, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import { beginCell, toNano } from '@ton/ton';
import banana from '../../assets/images/image.png';

import { Quote } from '../../components/Quote';
import Modal from '../../components/Modal/Modal';

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
import { pushWallet } from '../../redux/slice/userSlice';

// asdf
const prod = {
	_id: 'drop-coin',
	name: 'DROP COINS',
	description: `Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops

	Don't miss the opportunity to get souvenirs at a low price`,
	type: 'souvenir',
	price: 10,
	total: 1000,
	sold: 570,
	deliveryHold: 5,
	deliverMin: 3,
	deliverMax: 4,
	specialQuote:
		'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
	properties: [{ weight: '6,5 g' }, { diameter: '36 mm' }, { thikness: '3,5 mm' }],
	banners: ['https://i.ibb.co/C1Yw5qq/mainbanner1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png'],
};

function Homepage() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const productData = useSelector((state) => state.appState);
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
			productId: productData._id,
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
		tonConnectUI.uiOptions = {
			actionsConfiguration: {
				modals: ['before', 'success', 'error'],
				notifications: ['before', 'success', 'error'],
			},
		};
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
			console.log('re');
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
			{/* <TonConnectButton /> */}
			<Slider productData={productData} />
			<div className="wrapper">
				<div className={styles.title}>
					<div>
						<h1>{productData.name}</h1>
						<span>{productData.type[0].toUpperCase() + productData.type.slice(1).toLowerCase()}</span>
					</div>
					<button onClick={(e) => handleOrderDetailsControl(true)}>Price: {productData.price} TON</button>
				</div>

				<div className={styles.productInfo}>
					<div>
						<p>{`>${productData.sold}`}</p>
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
					<p dangerouslySetInnerHTML={{ __html: productData.description.replace(/\n/g, '<br />') }} />
				</div>
				<div className={styles.properties}>
					{productData.properties.map((propertyData, index) => {
						return (
							<div key={index}>
								<p>{Object.values(propertyData)}</p>
								<p>{Object.keys(propertyData)}</p>
							</div>
						);
					})}
				</div>

				<Quote lineColor={'rgba(67, 120, 255, 1)'} bgColor={'rgba(67, 120, 255, .1)'} text={productData.specialQuote} />
				<DeliveryToggler handleModalControl={handleModalControl} />

				<Modal zIndex={300} modalTitle={'Shipping Details'} handleModalControl={handleModalControl} modal={modal}>
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
								<img src={banana} alt="" />
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
				</Modal>

				<ButtonDefault propStyles={{ display: 'block', zIndex: readyToBuy && !modal ? 500 : 100 }} marginTop={20} onClick={finallyButton}>
					{wallet ? 'Buy Product' : 'Connect Wallet'}
				</ButtonDefault>
			</div>
			<Nav />
		</div>
	);
}
export default Homepage;
