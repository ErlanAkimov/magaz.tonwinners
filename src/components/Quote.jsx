export const Quote = ({ text }) => {
	return (
		<div
			style={{
				overflow: 'hidden',
				borderRadius: 10,
				paddingTop: 6,
				paddingBottom: 14,
				paddingRight: 28,
				paddingLeft: 12,
				backgroundColor: 'rgba(67, 120, 255, 0.1)',
				position: 'relative',
				marginTop: 30,
			}}
		>
			<div
				style={{
					width: 3,
					height: '100%',
					left: 0,
					top: 0,
					position: 'absolute',
					backgroundColor: 'rgba(67, 120, 255, 1)',
				}}
			></div>
			<p style={{ fontSize: 15, lineHeight: '20px' }} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
		</div>
	);
};
