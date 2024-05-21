import { Product } from "./components/product/Product";
import { OtherProducts } from "./components/otherproducts/OtherProducts";
import { Nav } from "/src/components/Nav/Nav";

const Productpage = () => {
  return (
    <>
      <Product />
      <OtherProducts />
      <Nav />
    </>
  );
};

export default Productpage;
