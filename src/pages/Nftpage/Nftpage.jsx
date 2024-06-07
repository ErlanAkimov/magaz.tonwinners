import { Product } from "./components/product/Product";
import { Nav } from "/src/components/Nav/Nav";

import styles from "./nftpage.module.scss";

export const Nftpage = () => {
    return (
        <div className={styles.wrapper}>
            <Product />
            <Nav />
        </div>
    );
};
