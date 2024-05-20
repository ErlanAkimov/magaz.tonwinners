import styles from "./homepage.module.scss";

import macMini from "../../assets/images/mac mini.png";
import coins from "../../assets/images/coin mini.png";
import pods from "../../assets/images/pods.png";
import phones from "../../assets/images/iphones.png";
import sneak from "../../assets/images/sneakers.png";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Nav } from "../../components/Nav/Nav";
import { ButtonDefault } from "../../components/ButtonDefault";
import { Slider } from "./components/slider/Slider";

import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useSelector } from "react-redux";

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
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const productsList = useSelector((state) => state.products.productsList);

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

      <h2 className={styles.catalogTitle}>New from MAGAZ</h2>
      <div className={styles.catalog}>
        {productsList.map((data, index) => (
          <ProductCard key={index} data={data} />
        ))}
      </div>

      {!wallet && <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>}
    </div>
  );
}
export default Homepage;
