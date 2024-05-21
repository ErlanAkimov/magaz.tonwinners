import styles from "./productpage.module.scss";

import { Nav } from "/src/components/Nav/Nav";
import { Product } from "./components/product/Product";
import { OtherProducts } from "./components/otherproducts/OtherProducts";

function Productpage() {
  return (
    <div className={styles.wrapper}>
      <Product />
      <OtherProducts />
      <Nav />
    </div>
  );
}
export default Productpage;
