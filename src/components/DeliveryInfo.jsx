import { useEffect, useState } from 'react';
import { Toggler } from './Toggler';
import {useSelector, useDispatch} from 'react-redux'
import { ButtonDefault } from './ButtonDefault';
import { changeInputValue, saveDataChanger } from '../redux/slice/userSlice';
import axios from 'axios'
import { api_server } from '../main';

const text = {
	title: {
		ru: 'Доставка',
		en: 'Delivery information'
	},
	name: {
		en:'Name',
		ru:'Имя',
	},
	country: {
		en:'Country',
		ru:'Страна',
	},
	state: {
		en:'State',
		ru:'Область',
	},
	city: {
		en:'City',
		ru:'Город',
	},
	street: {
		en:'Street',
		ru:'Улица',
	},
	zipcode: {
		en:'ZIP Code',
		ru:'Индекс',
	},
	attention: {
		en:"Please make sure your address is correct, otherwise your delivery won't reach you",
		ru:'Пожалуйста, перепроверьте адрес и данные получателя. В случае ошибки ваш заказ может не дойти до вас',
	},
}

export const DeliveryInfo = ({ styles, isOpen, setIsOpen }) => {
	const user = useSelector(state => state.user)
	const app = useSelector(state => state.appState);
	const dispatch = useDispatch();

	const [propStyles, setPropStyles] = useState({display: 'none'})

	const handleInputChange = (setter, e) => {
		setter(e.target.value);
	};

	// Меняем флаг на сохранение пользовательских данных
	const handleChangeSaveData = () => {
		dispatch(saveDataChanger());
	}

	const handleConfirm = async () => {
		await axios.post(`${api_server}/api/update-delivery-data`, {
			id: user.id,
			name: user.deliveryInfo.name,
			country: user.deliveryInfo.country,
			state: user.deliveryInfo.state,
			city: user.deliveryInfo.city,
			street: user.deliveryInfo.street,
			zipcode: user.deliveryInfo.zipcode,
			saveData: user.deliveryInfo.saveData
		})
		setIsOpen(false)
	}

	// useEffect(() => {
	// 	console.log(user.deliveryInfo.saveData)
	// }, [user.deliveryInfo])

	useEffect(() => {
		if (isOpen) {
			setPropStyles({display: 'block', zIndex: 1000 })
		} else {
			setTimeout(() => {
				setPropStyles({display: 'none', zIndex: 100})
			}, 270)
		}

	}, [isOpen])

	return (
		<div className={styles.form}>
			<p className={styles.formSubtitle}>{text.title[user.appLanguage]}</p>
			<div className={styles.inputs}>
				<div className={styles.inputBlock}>
					<span>{text.name[user.appLanguage]}: </span>
					<input value={user.deliveryInfo.name} onChange={(e) => dispatch(changeInputValue({input: 'name', value: e.target.value}))} type="text" placeholder="Jon Jones" />
				</div>

				<div className={styles.inputBlock}>
					<span>{text.country[user.appLanguage]}: </span>
					<input value={user.deliveryInfo.country} onChange={(e) => dispatch(changeInputValue({input: 'country', value: e.target.value}))} type="text" placeholder="USA" />
				</div>

				<div className={styles.inputBlock}>
					<span>{text.state[user.appLanguage]}: </span>
					<input value={user.deliveryInfo.state} onChange={(e) => dispatch(changeInputValue({input: 'state', value: e.target.value}))} type="text" placeholder="Illinois" />
				</div>

				<div className={styles.inputBlock}>
					<span>{text.city[user.appLanguage]}: </span>
					<input value={user.deliveryInfo.city} onChange={(e) => dispatch(changeInputValue({input: 'city', value: e.target.value}))} type="text" placeholder="Springfield" />
				</div>

				<div className={styles.inputBlock}>
					<span>{text.street[user.appLanguage]}: </span>
					<input  value={user.deliveryInfo.street} onChange={(e) => dispatch(changeInputValue({input: 'street', value: e.target.value}))} type="text" placeholder="123 Main str" />
				</div>

				<div className={styles.inputBlock}>
					<span>{text.zipcode[user.appLanguage]}: </span>
					<input value={user.deliveryInfo.zipcode} onChange={(e) => dispatch(changeInputValue({input: 'zipcode', value: e.target.value}))} type="tel" placeholder="62701" />
				</div>
			</div>
			<p className={styles.attention}>{text.attention[user.appLanguage]}</p>
			<div className={styles.inputBlock} style={{ justifyContent: 'space-between', marginTop: 30 }}>
				<span onClick={handleConfirm} style={{ color: 'black' }}>Save my address and data</span>
				<Toggler backgroundColor={'#1CC455'} flag={user.deliveryInfo.saveData} func={handleChangeSaveData} />
			</div>
			<div>
				<ButtonDefault onClick={handleConfirm} propStyles={propStyles}>
					Confirm
				</ButtonDefault>
			</div>

		</div>
	);
};
