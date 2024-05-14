import { useEffect, useState } from 'react';
import styles from './nav.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Nav = () => {
	const [page, setPage] = useState();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		setPage(window.location.pathname);
	}, []);
	return (
		<div className={styles.wrapper}>
			<Link to="/" className={styles.item}>
				<div className={styles.item}>
					<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M3.01727 9.98101C2.74998 10.8693 2.60656 11.8095 2.60656 12.7821C2.60656 13.7547 2.74998 14.695 3.01727 15.5832H7.37894C7.27178 14.7178 7.21251 13.7849 7.21251 12.7821C7.21251 11.7793 7.27178 10.8465 7.37894 9.98101H3.01727ZM3.86195 8.00244H7.72913C8.1928 6.02346 8.92012 4.4903 9.70817 3.35786C7.19995 4.10184 5.11091 5.79135 3.86195 8.00244ZM12.5915 3.12126C11.7635 3.75913 10.4971 5.26827 9.76608 8.00244H15.4169C14.6858 5.26827 13.4195 3.75913 12.5915 3.12126ZM15.8102 9.98101H9.37274C9.25716 10.8266 9.19108 11.7583 9.19108 12.7821C9.19108 13.806 9.25716 14.7377 9.37274 15.5832H15.8102C15.9258 14.7377 15.9919 13.806 15.9919 12.7821C15.9919 11.7583 15.9258 10.8266 15.8102 9.98101ZM17.804 15.5832C17.9112 14.7178 17.9704 13.7849 17.9704 12.7821C17.9704 11.7793 17.9112 10.8465 17.804 9.98101H22.1663C22.433 10.8679 22.5764 11.8078 22.5764 12.7821C22.5764 13.7564 22.433 14.6963 22.1663 15.5832H17.804ZM15.4169 17.5618H9.76608C10.4971 20.296 11.7635 21.8051 12.5915 22.443C13.4195 21.8051 14.6858 20.296 15.4169 17.5618ZM9.70817 22.2064C8.92012 21.0739 8.1928 19.5408 7.72913 17.5618L3.86195 17.5618C5.11091 19.7729 7.19995 21.4624 9.70817 22.2064ZM15.475 22.2061C16.263 21.0737 16.9902 19.5406 17.4538 17.5618H21.3217C20.0726 19.7727 17.9825 21.462 15.475 22.2061ZM21.3217 8.00244H17.4538C16.9902 6.02365 16.263 4.49059 15.475 3.35818C17.9825 4.10229 20.0726 5.79151 21.3217 8.00244ZM0.627991 12.7821C0.627991 6.24235 5.99663 0.963135 12.5915 0.963135C17.7192 0.963135 22.0998 4.15161 23.7999 8.64139C24.2883 9.93116 24.555 11.3269 24.555 12.7821C24.555 14.2373 24.2883 15.6331 23.7999 16.9228C22.0998 21.4126 17.7192 24.6011 12.5915 24.6011C5.99663 24.6011 0.627991 19.3219 0.627991 12.7821Z"
							fill={page === '/' ? '#007AFF' : '#A2ACB0'}
						/>
					</svg>

					<p style={{ color: page === '/' ? '#007AFF' : '#A2ACB0' }}>Home</p>
				</div>
			</Link>
			<Link to="/categories" className={styles.item}>
				<div className={styles.item}>
					<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11.832 0.100098H11.918C13.7069 0.100092 15.1082 0.100087 16.231 0.197586C17.3742 0.296853 18.3137 0.502356 19.154 0.964338C20.3159 1.60307 21.272 2.55921 21.9108 3.72106C22.3727 4.5614 22.5783 5.50094 22.6775 6.64412C22.775 7.76694 22.775 9.16819 22.775 10.9571V11.0431C22.775 12.832 22.775 14.2333 22.6775 15.3561C22.5783 16.4993 22.3727 17.4388 21.9108 18.2791C21.272 19.441 20.3159 20.3971 19.154 21.0359C18.3137 21.4978 17.3742 21.7033 16.231 21.8026C15.1082 21.9001 13.7069 21.9001 11.918 21.9001H11.832C10.0431 21.9001 8.64185 21.9001 7.51902 21.8026C6.37585 21.7033 5.43631 21.4978 4.59597 21.0359C3.43412 20.3971 2.47798 19.441 1.83925 18.2791C1.37726 17.4388 1.17176 16.4993 1.07249 15.3561C0.974995 14.2333 0.975 12.832 0.975006 11.0431V10.9571C0.975 9.1682 0.974995 7.76694 1.07249 6.64412C1.17176 5.50094 1.37726 4.5614 1.83925 3.72106C2.47798 2.55921 3.43412 1.60307 4.59597 0.964338C5.43631 0.502356 6.37585 0.296853 7.51902 0.197586C8.64185 0.100087 10.0431 0.100092 11.832 0.100098ZM7.67474 1.99084C6.65022 2.0798 5.99234 2.25076 5.46313 2.54169C4.60059 3.01587 3.89078 3.72568 3.4166 4.58822C3.12566 5.11743 2.95471 5.77531 2.86575 6.79983C2.7758 7.83571 2.77501 9.15895 2.77501 11.0001C2.77501 12.8412 2.7758 14.1645 2.86575 15.2004C2.95471 16.2249 3.12566 16.8828 3.4166 17.412C3.89078 18.2745 4.60059 18.9843 5.46313 19.4585C5.99233 19.7494 6.65022 19.9204 7.67474 20.0094C8.71061 20.0993 10.0339 20.1001 11.875 20.1001C13.7162 20.1001 15.0394 20.0993 16.0753 20.0094C17.0998 19.9204 17.7577 19.7494 18.2869 19.4585C19.1494 18.9843 19.8592 18.2745 20.3334 17.412C20.6243 16.8828 20.7953 16.2249 20.8843 15.2004C20.9742 14.1645 20.975 12.8412 20.975 11.0001C20.975 9.15895 20.9742 7.83571 20.8843 6.79983C20.7953 5.77531 20.6243 5.11743 20.3334 4.58822C19.8592 3.72568 19.1494 3.01587 18.2869 2.54169C17.7577 2.25076 17.0998 2.0798 16.0753 1.99084C15.0394 1.90089 13.7162 1.9001 11.875 1.9001C10.0339 1.9001 8.71061 1.90089 7.67474 1.99084ZM8.09078 4.01314H8.16392C8.56984 4.01312 8.93275 4.01309 9.23316 4.04032C9.55493 4.06948 9.8922 4.13547 10.2149 4.32176C10.5651 4.52394 10.8558 4.81474 11.058 5.16493C11.2443 5.48759 11.3103 5.82487 11.3395 6.14664C11.3667 6.44704 11.3667 6.80996 11.3667 7.21588V7.289C11.3667 7.69492 11.3667 8.05784 11.3395 8.35825C11.3103 8.68002 11.2443 9.01729 11.058 9.33995C10.8558 9.69014 10.5651 9.98094 10.2149 10.1831C9.8922 10.3694 9.55493 10.4354 9.23316 10.4646C8.93275 10.4918 8.56983 10.4918 8.16391 10.4917H8.09079C7.68487 10.4918 7.32195 10.4918 7.02154 10.4646C6.69977 10.4354 6.3625 10.3694 6.03984 10.1831C5.68965 9.98094 5.39885 9.69014 5.19667 9.33995C5.01038 9.01729 4.94439 8.68002 4.91523 8.35825C4.888 8.05784 4.88802 7.69493 4.88805 7.28901V7.21588C4.88802 6.80995 4.888 6.44704 4.91523 6.14664C4.94439 5.82486 5.01038 5.48759 5.19667 5.16493C5.39885 4.81474 5.68965 4.52394 6.03984 4.32176C6.3625 4.13547 6.69977 4.06948 7.02154 4.04032C7.32195 4.01309 7.68486 4.01312 8.09078 4.01314ZM6.93984 5.88061C6.93975 5.88066 6.9399 5.88057 6.93984 5.88061C6.86329 5.92481 6.79972 5.98838 6.75552 6.06493C6.75548 6.06499 6.75557 6.06484 6.75552 6.06493C6.75281 6.06952 6.72538 6.11601 6.70788 6.30911C6.68891 6.51841 6.68805 6.79861 6.68805 7.25244C6.68805 7.70627 6.68891 7.98648 6.70788 8.19577C6.72538 8.38888 6.75268 8.43514 6.75538 8.43973C6.79958 8.51628 6.86329 8.58008 6.93984 8.62428C6.94443 8.62698 6.99091 8.65441 7.18402 8.67191C7.39332 8.69088 7.67352 8.69174 8.12735 8.69174C8.58118 8.69174 8.86138 8.69088 9.07068 8.67191C9.2638 8.65441 9.31005 8.62711 9.31464 8.62441C9.39119 8.58021 9.45499 8.51651 9.49918 8.43995C9.50189 8.43537 9.52932 8.38889 9.54682 8.19578C9.56579 7.98648 9.56665 7.70627 9.56665 7.25244C9.56665 6.79861 9.56579 6.51841 9.54682 6.30911C9.52932 6.116 9.50202 6.06974 9.49932 6.06516C9.45512 5.9886 9.39142 5.92481 9.31486 5.88061C9.31027 5.8779 9.26378 5.85047 9.07068 5.83297C8.86138 5.814 8.58118 5.81314 8.12735 5.81314C7.67352 5.81314 7.39332 5.814 7.18402 5.83297C6.99092 5.85047 6.94443 5.8779 6.93984 5.88061ZM15.5861 4.01314H15.6592C16.0652 4.01312 16.4281 4.01309 16.7285 4.04032C17.0502 4.06948 17.3875 4.13547 17.7102 4.32176C18.0604 4.52394 18.3512 4.81474 18.5533 5.16493C18.7396 5.48759 18.8056 5.82486 18.8348 6.14664C18.862 6.44704 18.862 6.80996 18.862 7.21589V7.289C18.862 7.69492 18.862 8.05784 18.8348 8.35825C18.8056 8.68002 18.7396 9.01729 18.5533 9.33995C18.3512 9.69014 18.0604 9.98094 17.7102 10.1831C17.3875 10.3694 17.0502 10.4354 16.7285 10.4646C16.4281 10.4918 16.0651 10.4918 15.6592 10.4917H15.5861C15.1802 10.4918 14.8173 10.4918 14.5169 10.4646C14.1951 10.4354 13.8578 10.3694 13.5352 10.1831C13.185 9.98094 12.8942 9.69014 12.692 9.33995C12.5057 9.01729 12.4397 8.68002 12.4105 8.35825C12.3833 8.05784 12.3833 7.69492 12.3834 7.289V7.21589C12.3833 6.80996 12.3833 6.44704 12.4105 6.14664C12.4397 5.82487 12.5057 5.48759 12.692 5.16493C12.8942 4.81474 13.185 4.52394 13.5352 4.32176C13.8578 4.13547 14.1951 4.06948 14.5169 4.04032C14.8173 4.01309 15.1802 4.01312 15.5861 4.01314ZM14.4352 5.88061C14.3586 5.92481 14.295 5.98838 14.2508 6.06493C14.2481 6.06952 14.2207 6.116 14.2032 6.30911C14.1842 6.51841 14.1834 6.79861 14.1834 7.25244C14.1834 7.70627 14.1842 7.98648 14.2032 8.19578C14.2207 8.38888 14.248 8.43514 14.2507 8.43973C14.2949 8.51628 14.3586 8.58008 14.4352 8.62428C14.4397 8.62699 14.4862 8.65441 14.6793 8.67191C14.8886 8.69088 15.1688 8.69174 15.6227 8.69174C16.0765 8.69174 16.3567 8.69088 16.566 8.67191C16.7591 8.65441 16.8054 8.62711 16.8099 8.62441C16.8865 8.58021 16.9503 8.51651 16.9945 8.43995C16.9972 8.43536 17.0246 8.38888 17.0421 8.19577C17.0611 7.98648 17.062 7.70627 17.062 7.25244C17.062 6.79861 17.0611 6.51841 17.0421 6.30911C17.0246 6.11601 16.9973 6.06975 16.9946 6.06516C16.9504 5.9886 16.8867 5.92481 16.8102 5.88061C16.8056 5.8779 16.7591 5.85047 16.566 5.83297C16.3567 5.814 16.0765 5.81314 15.6227 5.81314C15.1688 5.81314 14.8886 5.814 14.6793 5.83297C14.4862 5.85047 14.4397 5.8779 14.4352 5.88061ZM8.09079 11.5085H8.16391C8.56983 11.5084 8.93275 11.5084 9.23316 11.5356C9.55493 11.5648 9.8922 11.6308 10.2149 11.8171C10.5651 12.0193 10.8559 12.3101 11.058 12.6602C11.2443 12.9829 11.3103 13.3202 11.3395 13.6419C11.3667 13.9424 11.3667 14.3053 11.3667 14.7112V14.7843C11.3667 15.1902 11.3667 15.5532 11.3395 15.8536C11.3103 16.1753 11.2443 16.5126 11.058 16.8353C10.8558 17.1855 10.565 17.4763 10.2149 17.6784C9.8922 17.8647 9.55493 17.9307 9.23316 17.9599C8.93275 17.9871 8.56983 17.9871 8.16391 17.9871H8.09079C7.68487 17.9871 7.32195 17.9871 7.02154 17.9599C6.69977 17.9307 6.3625 17.8647 6.03984 17.6784C5.68965 17.4763 5.39885 17.1855 5.19667 16.8353C5.01038 16.5126 4.94439 16.1753 4.91523 15.8536C4.888 15.5532 4.88802 15.1902 4.88805 14.7843V14.7112C4.88802 14.3053 4.888 13.9424 4.91523 13.6419C4.94439 13.3202 5.01038 12.9829 5.19667 12.6602C5.39885 12.3101 5.68965 12.0193 6.03984 11.8171C6.3625 11.6308 6.69977 11.5648 7.02154 11.5356C7.32195 11.5084 7.68487 11.5084 8.09079 11.5085ZM6.93984 13.3759C6.86329 13.4201 6.79972 13.4837 6.75552 13.5602C6.75281 13.5648 6.72538 13.6113 6.70788 13.8044C6.68891 14.0137 6.68805 14.2939 6.68805 14.7478C6.68805 15.2016 6.68891 15.4818 6.70788 15.6911C6.72538 15.8842 6.75268 15.9304 6.75539 15.935C6.79958 16.0116 6.86329 16.0754 6.93984 16.1196C6.94443 16.1223 6.99092 16.1497 7.18402 16.1672C7.39332 16.1862 7.67352 16.1871 8.12735 16.1871C8.58118 16.1871 8.86138 16.1862 9.07068 16.1672C9.26379 16.1497 9.31005 16.1224 9.31464 16.1197C9.39119 16.0755 9.45499 16.0118 9.49918 15.9353C9.50189 15.9307 9.52932 15.8842 9.54682 15.6911C9.56579 15.4818 9.56665 15.2016 9.56665 14.7478C9.56665 14.2939 9.56579 14.0137 9.54682 13.8044C9.52932 13.6113 9.50203 13.5651 9.49932 13.5605C9.45512 13.4839 9.39141 13.4201 9.31486 13.3759C9.31027 13.3732 9.26379 13.3458 9.07068 13.3283C8.86138 13.3093 8.58118 13.3085 8.12735 13.3085C7.67352 13.3085 7.39332 13.3093 7.18402 13.3283C6.99091 13.3458 6.94443 13.3732 6.93984 13.3759ZM15.5861 11.5085H15.6592C16.0651 11.5084 16.4281 11.5084 16.7285 11.5356C17.0502 11.5648 17.3875 11.6308 17.7102 11.8171C18.0604 12.0193 18.3512 12.3101 18.5533 12.6602C18.7396 12.9829 18.8056 13.3202 18.8348 13.6419C18.862 13.9424 18.862 14.3053 18.862 14.7112V14.7843C18.862 15.1902 18.862 15.5532 18.8348 15.8536C18.8056 16.1753 18.7396 16.5126 18.5533 16.8353C18.3512 17.1855 18.0604 17.4762 17.7102 17.6784C17.3875 17.8647 17.0502 17.9307 16.7285 17.9599C16.4281 17.9871 16.0651 17.9871 15.6592 17.9871H15.5861C15.1802 17.9871 14.8173 17.9871 14.5169 17.9599C14.1951 17.9307 13.8578 17.8647 13.5352 17.6784C13.185 17.4763 12.8942 17.1855 12.692 16.8353C12.5057 16.5126 12.4397 16.1753 12.4105 15.8536C12.3833 15.5532 12.3833 15.1902 12.3834 14.7843V14.7112C12.3833 14.3053 12.3833 13.9424 12.4105 13.6419C12.4397 13.3202 12.5057 12.9829 12.692 12.6602C12.8942 12.3101 13.185 12.0193 13.5352 11.8171C13.8578 11.6308 14.1951 11.5648 14.5169 11.5356C14.8173 11.5084 15.1802 11.5084 15.5861 11.5085ZM14.4352 13.3759C14.3586 13.4201 14.295 13.4837 14.2508 13.5602C14.2481 13.5648 14.2207 13.6113 14.2032 13.8044C14.1842 14.0137 14.1834 14.2939 14.1834 14.7478C14.1834 15.2016 14.1842 15.4818 14.2032 15.6911C14.2207 15.8842 14.248 15.9304 14.2507 15.935C14.2949 16.0116 14.3586 16.0754 14.4352 16.1196C14.4397 16.1223 14.4862 16.1497 14.6793 16.1672C14.8886 16.1862 15.1688 16.1871 15.6227 16.1871C16.0765 16.1871 16.3567 16.1862 16.566 16.1672C16.7591 16.1497 16.8054 16.1224 16.8099 16.1197C16.8865 16.0755 16.9503 16.0118 16.9945 15.9353C16.9972 15.9307 17.0246 15.8842 17.0421 15.6911C17.0611 15.4818 17.062 15.2016 17.062 14.7478C17.062 14.2939 17.0611 14.0137 17.0421 13.8044C17.0246 13.6113 16.9973 13.5651 16.9946 13.5605C16.9504 13.4839 16.8867 13.4201 16.8102 13.3759C16.8056 13.3732 16.7591 13.3458 16.566 13.3283C16.3567 13.3093 16.0765 13.3085 15.6227 13.3085C15.1688 13.3085 14.8886 13.3093 14.6793 13.3283C14.4862 13.3458 14.4397 13.3732 14.4352 13.3759Z"
							fill={page === '/categories' ? '#007AFF' : '#A2ACB0'}
						/>
					</svg>
					<p style={{ color: page === '/categories' ? '#007AFF' : '#A2ACB0' }}>Categories</p>
				</div>
			</Link>

			<Link to="/orders" className={styles.item}>
				<div className={styles.item}>
					<div style={{ position: 'relative', width: 'fit-content', marginInline: 'auto' }}>
						{user.cartAmount > 0 && <div className={styles.ordersCounter}>{user.cartAmount}</div>}

						<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M9.09088 2.04691C8.91044 2.01882 8.71391 2.01633 8.13004 2.01633H7.64185C6.44125 2.01633 5.60657 2.01735 4.96267 2.081C4.33307 2.14324 3.98336 2.25832 3.72387 2.42539C3.41539 2.624 3.15302 2.88637 2.95441 3.19485C2.78734 3.45434 2.67226 3.80405 2.61003 4.43365C2.54637 5.07755 2.54535 5.91222 2.54535 7.11282V11.906C2.54535 13.567 2.54726 14.7222 2.66435 15.5931C2.77795 16.4381 2.98493 16.8794 3.29794 17.1924C3.61095 17.5054 4.0523 17.7124 4.8973 17.826C5.76819 17.9431 6.92339 17.945 8.58438 17.945H15.6658C17.3268 17.945 18.482 17.9431 19.3528 17.826C20.1978 17.7124 20.6392 17.5054 20.9522 17.1924C21.2652 16.8794 21.4722 16.4381 21.5858 15.5931C21.7029 14.7222 21.7048 13.567 21.7048 11.906V10.7718C21.7048 9.18141 21.703 8.07538 21.5949 7.23825C21.4899 6.42488 21.2981 5.99545 21.0101 5.68814C20.9721 5.64768 20.9329 5.60846 20.8925 5.57053C20.5851 5.2825 20.1557 5.09066 19.3423 4.98564C18.5052 4.87755 17.3992 4.87579 15.8088 4.87579H14.9872C14.9647 4.87579 14.9426 4.8758 14.9208 4.8758C14.4285 4.8759 14.0846 4.87597 13.7494 4.82378C13.0534 4.71543 12.3939 4.44042 11.8272 4.02219C11.5542 3.82075 11.3123 3.57642 10.9659 3.22658C10.9505 3.21107 10.935 3.19535 10.9192 3.17942C10.5083 2.7646 10.3682 2.62672 10.2213 2.51829C9.88798 2.27235 9.50017 2.11063 9.09088 2.04691ZM8.19641 0.216317C8.68872 0.216217 9.03256 0.216147 9.36777 0.268334C10.0638 0.376689 10.7233 0.651699 11.29 1.06993C11.563 1.27136 11.8049 1.5157 12.1513 1.86554C12.1667 1.88105 12.1822 1.89677 12.198 1.9127C12.6089 2.32752 12.749 2.4654 12.8959 2.57382C13.2292 2.81977 13.617 2.98149 14.0263 3.04521C14.2068 3.0733 14.4033 3.07579 14.9872 3.07579L15.8714 3.07579C17.3843 3.07577 18.607 3.07575 19.5728 3.20046C20.5758 3.32996 21.4298 3.60716 22.1234 4.25721C22.1922 4.3217 22.2589 4.3884 22.3234 4.45721C22.9734 5.15077 23.2506 6.00482 23.3801 7.00775C23.5048 7.97363 23.5048 9.19632 23.5048 10.7092V11.9716C23.5048 13.5514 23.5048 14.8281 23.3698 15.8329C23.2293 16.8775 22.9282 17.762 22.225 18.4652C21.5218 19.1684 20.6373 19.4695 19.5927 19.61C18.5879 19.7451 17.3112 19.745 15.7313 19.745H8.5188C6.93899 19.745 5.66229 19.7451 4.65745 19.61C3.61286 19.4695 2.72834 19.1684 2.02515 18.4652C1.32196 17.762 1.02084 16.8775 0.880398 15.8329C0.745301 14.8281 0.745321 13.5514 0.745347 11.9716L0.745347 7.06593C0.745333 5.92331 0.745323 4.99944 0.818756 4.25658C0.894606 3.48927 1.0557 2.81882 1.44097 2.22043C1.77871 1.69585 2.22488 1.24969 2.74945 0.911951C3.34784 0.526679 4.01829 0.365584 4.7856 0.289734C5.52846 0.216301 6.45233 0.216312 7.59496 0.216326L8.13004 0.216326C8.15246 0.216326 8.17458 0.216322 8.19641 0.216317Z"
								fill={page === '/orders' ? '#007AFF' : '#A2ACB0'}
							/>
						</svg>

						<p style={{ color: page === '/orders' ? '#007AFF' : '#A2ACB0' }}>Orders</p>
					</div>
				</div>
			</Link>

			<Link to="/profile" className={styles.item}>
				<div className={styles.item}>
					<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11.3433 2.92877C6.36734 2.92877 2.35602 6.90601 2.35602 11.7847C2.35602 16.6633 6.36734 20.6405 11.3433 20.6405C16.3192 20.6405 20.3305 16.6633 20.3305 11.7847C20.3305 6.90601 16.3192 2.92877 11.3433 2.92877ZM0.377441 11.7847C0.377441 5.78863 5.29942 0.950195 11.3433 0.950195C17.3871 0.950195 22.3091 5.78863 22.3091 11.7847C22.3091 17.7807 17.3871 22.6191 11.3433 22.6191C5.29942 22.6191 0.377441 17.7807 0.377441 11.7847ZM15.1657 13.3135C15.6807 13.4961 15.9501 14.0616 15.7674 14.5766L14.8837 14.2631C15.7674 14.5766 15.7672 14.5772 15.767 14.5777L15.7666 14.579L15.7657 14.5815L15.7636 14.5873L15.7585 14.601C15.7547 14.6111 15.75 14.6231 15.7445 14.6369C15.7333 14.6646 15.7185 14.6997 15.6997 14.7409C15.6621 14.8234 15.608 14.9316 15.5339 15.057C15.3862 15.3069 15.1558 15.6303 14.8142 15.9513C14.113 16.6104 12.9998 17.2043 11.3433 17.2043C9.68675 17.2043 8.57361 16.6104 7.87233 15.9514C7.53081 15.6304 7.30036 15.307 7.15262 15.057C7.07855 14.9317 7.02442 14.8235 6.98683 14.741C6.968 14.6997 6.95323 14.6647 6.9421 14.637C6.93653 14.6232 6.93186 14.6111 6.92805 14.601L6.92296 14.5873L6.92088 14.5816L6.91995 14.579L6.91952 14.5778C6.91931 14.5772 6.91911 14.5767 7.806 14.2621L6.9191 14.5766C6.73647 14.0617 7.00585 13.4962 7.52079 13.3136C8.03089 13.1327 8.59059 13.3953 8.7786 13.9008C8.77984 13.9038 8.78262 13.9104 8.78706 13.9201C8.79858 13.9453 8.82083 13.9909 8.85587 14.0502C8.92637 14.1695 9.04511 14.3383 9.22735 14.5096C9.57361 14.835 10.2064 15.2257 11.3433 15.2257C12.4802 15.2257 13.1129 14.835 13.4592 14.5096C13.6414 14.3383 13.7602 14.1694 13.8307 14.0502C13.8657 13.9909 13.888 13.9453 13.8995 13.92C13.9039 13.9103 13.9067 13.9037 13.9079 13.9007C14.0959 13.3952 14.6556 13.1326 15.1657 13.3135ZM8.78319 13.9134C8.78324 13.9135 8.78314 13.9132 8.78319 13.9134Z"
							fill={page === '/profile' ? '#007AFF' : '#A2ACB0'}
						/>
						<path
							d="M9.84387 9.32371C9.84387 10.1393 9.28554 10.8005 8.5968 10.8005C7.90806 10.8005 7.34973 10.1393 7.34973 9.32371C7.34973 8.5081 7.90806 7.84692 8.5968 7.84692C9.28554 7.84692 9.84387 8.5081 9.84387 9.32371Z"
							fill={page === '/profile' ? '#007AFF' : '#A2ACB0'}
						/>
						<path
							d="M15.8298 9.32371C15.8298 10.1393 15.2715 10.8005 14.5827 10.8005C13.894 10.8005 13.3357 10.1393 13.3357 9.32371C13.3357 8.5081 13.894 7.84692 14.5827 7.84692C15.2715 7.84692 15.8298 8.5081 15.8298 9.32371Z"
							fill={page === '/profile' ? '#007AFF' : '#A2ACB0'}
						/>
					</svg>

					<p style={{ color: page === '/profile' ? '#007AFF' : '#A2ACB0' }}>Profile</p>
				</div>
			</Link>
		</div>
	);
};
