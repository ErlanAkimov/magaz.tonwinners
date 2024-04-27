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
		const searchParams = new URLSearchParams(window.location.search);
		const owner = searchParams.get('owner');
		let body = {}
		if (Object.keys(window.Telegram.WebApp.initDataUnsafe).length === 0) {
			body.id = 628122813
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

		axios.get(`https://magaz.tonwinners.com/api/product?id=drop-coin`).then((res) => {
			dispatch(setProduct(res.data));
			setProductLoaded(true);
		});

		axios.get(`${api_server}/api/get-products`).then(res => dispatch(initProductsList(res.data)))
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
	return <>{children}</>;
}

export default CustomProvider;
