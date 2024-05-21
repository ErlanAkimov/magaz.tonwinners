import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/userSlice';
import { Loader } from './components/Loader';
import { api_server } from './main';
import { initProductsList } from './redux/slice/productsSlice';
import PropTypes from 'prop-types';
function CustomProvider({ children }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [userLoaded, setUserLoaded] = useState(false);
	const [productLoaded, setProductLoaded] = useState(false);

	useEffect(() => {
		let body = {};

		if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length === 0) {
			if (localStorage.getItem('testerMark')) {
				body.id = Number(localStorage.getItem('testerMark'))
			} else {
				body.id = 1
			}
		}

		if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length > 0) {
			body = { ...window.Telegram.WebApp.initDataUnsafe.user };
		}

		axios.post(`https://magaz.tonwinners.com/api/user`, body).then((res) => {
			if (res.data !== 'no user') {
				dispatch(setUser(res.data));
				setUserLoaded(true);
			}
		});

		axios.post(`${api_server}/api/get-products`, { id: body.id }).then((res) => {
			if (res.data !== 'no products') {
				dispatch(initProductsList(res.data));
				setProductLoaded(true);
			}
		});
	}, [dispatch]);

	useEffect(() => {
		if (userLoaded && productLoaded) {
			setTimeout(() => {
				setLoading(false);
			}, 300);
		}
	}, [userLoaded, productLoaded]);

	return <>{loading ? <Loader /> : children}</>;
}

CustomProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default CustomProvider;
