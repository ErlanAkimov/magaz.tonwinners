import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/userSlice';
import { setProduct } from './redux/slice/applicationState';
import { Loader } from './components/Loader';
import { api_server } from './main';
import { initProductsList } from './redux/slice/productsSlice';

function CustomProvider({ children }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [userLoaded, setUserLoaded] = useState(false);
	const [productLoaded, setProductLoaded] = useState(false);

	useEffect(() => {
		const needTestProduct = localStorage.getItem('testerMark')
		let body = {}


		if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length === 0) {
			if (localStorage.getItem('testerMark')) {
				body.id = Number(localStorage.getItem('testerMark'))
			} else {
				body.id = 1
			}
		}

		if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length > 0) {
			body = { ...window.Telegram.WebApp.initDataUnsafe.user}
		}
		
		axios
			.post(`https://magaz.tonwinners.com/api/user`, body)
			.then((res) => {
				dispatch(setUser(res.data));
				setUserLoaded(true);
			});

		axios.post(`${api_server}/api/get-products`, {id: body.id}).then(res => {
			dispatch(initProductsList(res.data))
			setProductLoaded(true);
		})
	}, []);

	useEffect(() => {
		if (/* userLoaded && */ productLoaded) {
			setTimeout(() => {
				setLoading(false);
			}, 300);
		}
	}, [userLoaded, productLoaded]);

	return <>
		{loading ? <Loader /> : children}
	</>;
}

export default CustomProvider;
