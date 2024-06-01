// styles
import styles from "./homepage.module.scss";
import "swiper/swiper-bundle.css";

// components
import { Nav } from "../../components/Nav/Nav";
import { Slider } from "./components/slider/Slider";
import { WalletConnectionButton } from "./components/walletconnectionbutton/WalletConnectionButton";
import { Products } from "./components/products/Products";

function Homepage() {
    return (
        <div className={styles.wrapper}>
            <Nav />
            <Slider />
            <Products />
            <WalletConnectionButton />
        </div>
    );
}
export default Homepage;
