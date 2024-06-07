import styles from "./bundle.module.scss";

import { Nav } from "/src/components/Nav/Nav";
import { Products } from "./components/products/Products";
import { Banner } from "./components/banner/Banner";

export const Bundlepage = () => {
    return (
        <div className={styles.wrapper}>
            <Products />
            <Banner
                title={"NFT Bundle by @tkeeper"}
                description={"Purchase 4 NFTs for 14 TON by sending 1 transaction. You can get more information about each NFT just by tapping on it"}
            />
            <Nav />
        </div>
    );
};
