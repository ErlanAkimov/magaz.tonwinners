export const ButtonDefault = ({ onClick, children, marginTop }) => {
	const style = {
		height: 50,
		width: '100%',
		backgroundColor: 'rgba(0, 122, 255, 1)',
		borderRadius: 8,
		color: 'white',
		fontSize: 17,
		fontWeight: 600,
		marginTop,
	};
	return (
		<button onClick={onClick} style={style}>
			{children}
		</button>
	);
};
