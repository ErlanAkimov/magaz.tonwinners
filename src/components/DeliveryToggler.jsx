import { useSelector, useDispatch } from 'react-redux';
import { changeNeedDelivery } from '../redux/slice/cartSlice';
import { Toggler } from './Toggler';

const text = {
	ru: "Нажмите, если хотите доставку",
	en: "Activate, if you need to delivery",
};

export const DeliveryToggler = ({ handleModalControl, marginTop }) => {
	const dispatch = useDispatch();
	const needDelivery = useSelector((state) => state.cart.needDelivery);
	const language = useSelector((state) => state.user.appLanguage);

	const handleDeliveryToggle = () => {
		dispatch(changeNeedDelivery());

		if (!needDelivery) {
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
			<p style={{ fontSize: 17, display: 'flex', alignItems: 'center', columnGap: 10 }}>{text[language]}</p>
			<Toggler backgroundColor={'rgba(0, 122, 255, 1)'} func={handleDeliveryToggle} flag={needDelivery} />
		</div>
	);
};
