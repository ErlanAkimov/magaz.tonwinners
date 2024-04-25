import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './create-new-address.module.scss';
import { Input } from '../../components/Inputs/Input';
import { useSelector } from 'react-redux';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useNavigate } from 'react-router-dom';

export const CreateNewAddress = () => {
	const appLanguage = useSelector((state) => state.user.appLanguage);
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();

	const [addressName, setAddressName] = useState('');
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [zip, setZip] = useState('');

	const handlePick = (address) => {
		setAddressName(address.name)
		setCountry(address.country)
		setState(address.state)
		setCity(address.city)
		setStreet(address.street)
		setZip(address.zip)
	}

	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			<div className="text-13">{appLanguage === 'ru' ? 'Сохраните новый адрес' : 'save new address'}</div>

			<Input prop={{ place: 'Name', value: addressName, setValue: setAddressName }} />
			<Input prop={{ place: 'Country', value: country, setValue: setCountry }} />
			<Input prop={{ place: 'State', value: state, setValue: setState }} />
			<Input prop={{ place: 'City', value: city, setValue: setCity }} />
			<Input prop={{ place: 'Street', value: street, setValue: setStreet }} />
			<Input prop={{ place: 'ZIP code or pick-up point', value: zip, setValue: setZip }} />

			<div style={{ marginTop: 45 }} className="text-13">
				{appLanguage === 'ru' ? 'Мои адреса' : 'My addresses'}
			</div>
			<div className={styles.myAddresses}>
				{user.savedAddresses.map((address) => {
					return (
						<div key={address.id} className={styles.address} onClick={() => handlePick(address)}>
							{sub()}
							<div className={styles.central}>
								<p className={styles.addressName}>{address.name}</p>
								<p className={styles.pick}>{appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
							</div>

							<button className={styles.changeBtn} onClick={() => navigate(`/change-my-address/${address.id}`)}>
								{appLanguage === 'ru' ? 'Изменить' : 'Change'}
								{vector()}
							</button>
						</div>
					);
				})}
			</div>
			<ButtonDefault>{appLanguage === 'ru' ? 'Сохранить адрес' : 'Save address'}</ButtonDefault>
			<Nav />
		</div>
	);
};

function sub() {
	return (
		<svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0.653961 3.77606C0 5.05953 0 6.73968 0 10.1V20.9C0 24.2603 0 25.9405 0.653961 27.2239C1.2292 28.3529 2.14708 29.2708 3.27606 29.846C4.55953 30.5 6.23968 30.5 9.6 30.5H20.4C23.7603 30.5 25.4405 30.5 26.7239 29.846C27.8529 29.2708 28.7708 28.3529 29.346 27.2239C30 25.9405 30 24.2603 30 20.9V10.1C30 6.73969 30 5.05953 29.346 3.77606C28.7708 2.64708 27.8529 1.7292 26.7239 1.15396C25.4405 0.5 23.7603 0.5 20.4 0.5H9.6C6.23969 0.5 4.55953 0.5 3.27606 1.15396C2.14708 1.7292 1.2292 2.64708 0.653961 3.77606ZM6.9001 15.5C6.9001 14.7193 7.01055 13.9644 7.21669 13.25H10.6269C10.5451 13.9479 10.5001 14.6973 10.5001 15.5C10.5001 16.3027 10.5451 17.0521 10.6269 17.75H7.21669C7.01055 17.0357 6.9001 16.2807 6.9001 15.5ZM10.9403 11.45H7.98373C8.96545 9.75292 10.5452 8.44507 12.4348 7.81463C11.8394 8.73136 11.2979 9.93377 10.9403 11.45ZM12.7948 11.45C13.3775 9.31314 14.3484 8.11029 15.0001 7.57649C15.6518 8.11029 16.6227 9.31314 17.2054 11.45H12.7948ZM12.3001 15.5C12.3001 14.6795 12.3506 13.9311 12.4393 13.25H17.5609C17.6496 13.9311 17.7001 14.6795 17.7001 15.5C17.7001 16.3205 17.6496 17.0689 17.5609 17.75H12.4393C12.3506 17.0689 12.3001 16.3205 12.3001 15.5ZM19.5001 15.5C19.5001 16.3027 19.4551 17.0521 19.3733 17.75H22.7838C22.9896 17.0365 23.1001 16.2818 23.1001 15.5C23.1001 14.7182 22.9896 13.9635 22.7838 13.25H19.3733C19.4551 13.9479 19.5001 14.6973 19.5001 15.5ZM15.0001 23.4235C14.3484 22.8897 13.3775 21.6869 12.7948 19.55H17.2054C16.6227 21.6869 15.6518 22.8897 15.0001 23.4235ZM10.9403 19.55C11.2979 21.0662 11.8394 22.2687 12.4348 23.1854C10.5452 22.5549 8.96545 21.2471 7.98373 19.55L10.9403 19.55ZM19.0599 19.55C18.7023 21.0662 18.1608 22.2686 17.5654 23.1854C19.4547 22.5551 21.0347 21.2475 22.0167 19.55H19.0599ZM19.0599 11.45H22.0167C21.0347 9.75248 19.4547 8.44495 17.5654 7.81464C18.1608 8.73137 18.7023 9.93378 19.0599 11.45ZM15.0001 5.60001C9.53248 5.60001 5.1001 10.0324 5.1001 15.5C5.1001 20.9676 9.53248 25.4 15.0001 25.4C19.2501 25.4 22.8725 22.7223 24.2765 18.965C24.68 17.8854 24.9001 16.7174 24.9001 15.5C24.9001 14.2826 24.68 13.1146 24.2765 12.035C22.8725 8.27767 19.2501 5.60001 15.0001 5.60001Z"
				fill="#F10DA3"
			/>
		</svg>
	);
}

function vector() {
	return (
		<svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1.5L6 6.5L1 11.5" stroke="#707579" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
