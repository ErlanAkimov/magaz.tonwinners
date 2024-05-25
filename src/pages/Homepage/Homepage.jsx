// styles
import styles from "./homepage.module.scss";
import "swiper/swiper-bundle.css";

// images
import macMini from "../../assets/images/mac mini.png";
import coins from "../../assets/images/coin mini.png";
import pods from "../../assets/images/pods.png";
import phones from "../../assets/images/iphones.png";
import sneak from "../../assets/images/sneakers.png";

// components
import { Nav } from "../../components/Nav/Nav";
import { Slider } from "./components/slider/Slider";
import { WalletConnectionButton } from "./components/walletconnectionbutton/WalletConnectionButton";

// dependencies
import { Products } from "./components/products/Products";

const cats = [
    {
        img: macMini,
        text: "macbooks",
    },
    {
        img: coins,
        text: "dropcoins",
    },
    {
        img: pods,
        text: "headphones",
    },
    {
        img: phones,
        text: "iphones",
    },
    {
        img: sneak,
        text: "sneakers",
    },
];

function Homepage() {
    return (
        <div className={styles.wrapper}>
            <Nav />
            <Slider />
            {/* <div className={styles.categories}>
				{cats.map((cat) => {
					return (
						<div key={cat.text} className={styles.catItems}>
							<div className={styles.catImageBlock}>
								<img src={cat.img} alt="" />
							</div>
							<p className={styles.catText}>{cat.text}</p>
						</div>
					);
				})}
			</div> */}
            <Products />
            <WalletConnectionButton />
        </div>
    );
}
export default Homepage;
