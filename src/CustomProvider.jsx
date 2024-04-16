import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/userSlice';
import { setProduct } from './redux/slice/applicationState';
import { Loader } from './components/Loader';

function CustomProvider({ children }) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
	const [userLoaded, setUserLoaded] = useState(false);
	const [productLoaded, setProductLoaded] = useState(false);
	useEffect(() => {

		const searchParams = new URLSearchParams(window.location.search);
		const owner = searchParams.get('owner');
		let body = {}
		const newBodyForCheck = []
		if (owner) {
			body.id = parseInt(owner)
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
	}, []);

	useEffect(() => {
		if (userLoaded && productLoaded) {
			setTimeout(() => {
				setLoading(false);
			}, 300);
		}
	}, [userLoaded, productLoaded]);

	return <>{loading ? <Loader /> : children}</>;
}

export default CustomProvider;
