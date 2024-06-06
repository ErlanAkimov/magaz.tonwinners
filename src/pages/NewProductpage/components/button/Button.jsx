import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTonWallet, useTonConnectModal } from "@tonconnect/ui-react";

import { ButtonDefault } from "/src/components/ButtonDefault";

import { addToCart } from "/src/redux/slice/userSlice";

import styles from "./button.module.scss";

export const Button = ({ productInCart }) => {
    const { open: openTonConnectModal } = useTonConnectModal();
    const navigate = useNavigate();
    const wallet = useTonWallet();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    if (productInCart > 0) {
        return (
            <div className={styles.cartButton}>
                <p onClick={() => navigate("/orders")} className={styles.counter}>
                    {user.appLanguage === "ru" ? "Перейти в корзину" : "View Orders"}
                </p>
            </div>
        );
    }

    const addToCartHandler = () => (wallet ? dispatch(addToCart({ ...productData, size: pickedSize })) : openTonConnectModal());

    return (
        <ButtonDefault marginTop={20} onClick={addToCartHandler}>
            {wallet ? "Buy Product" : "Connect Wallet"}
        </ButtonDefault>
    );
};
