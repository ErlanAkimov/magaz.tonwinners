import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './del.module.scss';
import { Input } from '../../components/Inputs/Input';

export const DeliveryInfo = () => {
	const [deliveryName, setDeliveryName] = useState('');
	useEffect(() => {}, []);
	return (
		<div className={styles.wrapper}>
			<div className="text-13">Изменить адрес</div>

			<Input prop={{ place: 'Name', value: deliveryName, setValue: setDeliveryName }} />
			<Input prop={{ place: 'Country', value: deliveryName, setValue: setDeliveryName }} />
			<Input prop={{ place: 'State', value: deliveryName, setValue: setDeliveryName }} />
			<Input prop={{ place: 'City', value: deliveryName, setValue: setDeliveryName }} />
			<Input prop={{ place: 'Street', value: deliveryName, setValue: setDeliveryName }} />
			<Input prop={{ place: 'ZIP code or pick-up point', value: deliveryName, setValue: setDeliveryName }} />
			<Nav />
		</div>
	);
};
