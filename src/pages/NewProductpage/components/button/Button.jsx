import { useNavigate } from "react-router-dom";
import { useTonWallet } from "@tonconnect/ui-react";

import { ButtonDefault } from "/src/components/ButtonDefault";

export const Button = ({ productInCart }) => {
  const navigate = useNavigate();
  const wallet = useTonWallet();

  if (productInCart > 0) {
    return (
      <div className={styles.cartButton}>
        <p onClick={() => navigate("/orders")} className={styles.counter}>
          {user.appLanguage === "ru" ? "Перейти в корзину" : "View Orders"}
        </p>
      </div>
    );
  }

  return (
    <ButtonDefault
      marginTop={20}
      onClick={() => {
        wallet
          ? dispatch(addToCart({ ...productData, size: pickedSize }))
          : open();
      }}
    >
      {wallet ? "Buy Product" : "Connect Wallet"}
    </ButtonDefault>
  );
};
