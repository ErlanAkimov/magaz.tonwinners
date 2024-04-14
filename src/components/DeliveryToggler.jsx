import { useSelector, useDispatch } from 'react-redux';
import { changeNeedDelivery } from '../redux/slice/cartSlice';
import { Toggler } from './Toggler';

const text = {
	ru: ['Да, мне нужна доставка', 'Мне не нужна доставка'],
	en: ['Yes, i want delivery', "No, i don't need delivery"],
};

export const DeliveryToggler = ({ handleModalControl, marginTop }) => {
	const dispatch = useDispatch();
	const needDelivery = useSelector((state) => state.cart.needDelivery);
	const language = useSelector((state) => state.user.appLanguage);
	const deliveryInfo = useSelector((state) => state.user.deliveryInfo);

	const handleDeliveryToggle = () => {
		dispatch(changeNeedDelivery());

		if (!deliveryInfo.status && !needDelivery) {
			handleModalControl(true)
		}
	};

	return (
		<div
			style={{
				marginTop: marginTop ? marginTop : 20,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingInline: 16,
				columnGap: 16,
				width: '100%',
				height: 46,
			}}
		>
			<p style={{ fontSize: 17 }}>{needDelivery ? text[language][0] : text[language][1]}</p>
			<Toggler backgroundColor={'rgba(0, 122, 255, 1)'} func={handleDeliveryToggle} flag={needDelivery} />
		</div>
	);
};
