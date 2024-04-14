
export const DeliveryInfo = ({ styles }) => {

	const [saveData, setSaveData] = useState(true);

	return (
		<div className={styles.form}>
		<p className={styles.formSubtitle}>Delivery information</p>
		<div className={styles.inputs}>
			<div className={styles.inputBlock}>
				<span>Name: </span>
				<input type="text" placeholder="Jon Jones" />
			</div>

			<div className={styles.inputBlock}>
				<span>Country: </span>
				<input type="text" placeholder="USA" />
			</div>

			<div className={styles.inputBlock}>
				<span>State: </span>
				<input type="text" placeholder="Illinois" />
			</div>

			<div className={styles.inputBlock}>
				<span>City: </span>
				<input type="text" placeholder="Springfield" />
			</div>

			<div className={styles.inputBlock}>
				<span>Street: </span>
				<input type="text" placeholder="123 Main str" />
			</div>

			<div className={styles.inputBlock}>
				<span>ZIP Code: </span>
				<input type="text" placeholder="62701" />
			</div>
		</div>
		<p className={styles.attention}>Please make sure your address is correct, otherwise your delivery won't reach you</p>
		<div className={styles.inputBlock} style={{ justifyContent: 'space-between', marginTop: 30 }}>
			<span style={{ color: 'black' }}>Save my address and data</span>
			<Toggler backgroundColor={'#1CC455'} flag={saveData} func={() => setSaveData((prev) => !prev)} />
		</div>
		<ButtonDefault onClick={handleConfirmData} marginTop={50}>
			Confirm
		</ButtonDefault>
	</div>
	)
}