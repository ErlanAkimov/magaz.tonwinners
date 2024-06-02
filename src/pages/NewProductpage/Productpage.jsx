import { Product } from "./components/product/Product";
import { OtherProducts } from "./components/otherproducts/OtherProducts";
import { Nav } from "/src/components/Nav/Nav";

import styles from "./productpage.module.scss";

import data from "./data";

const Productpage = () => {
    return (
        <div className={styles.wrapper}>
            <Product data={data.product} />
            <OtherProducts data={data.otherProducts} />
            <Nav />
        </div>
    );
};

export default Productpage;
