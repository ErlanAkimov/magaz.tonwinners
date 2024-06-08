import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./product.module.scss";

import { WalletConnectionButton } from "../walletconnectionbutton/WalletConnectionButton";

import xApi from "/src/axios";

export const Product = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { bundleId } = useParams();
    const [nft, setNft] = useState(null);

    const fetchNft = async () => {
        try {
            const response = await xApi("/bundles/1");

            setNft(response.data.nft_items.find((nft_item) => nft_item.nft_address === bundleId));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNft();
    }, []);

    if (!nft) return null;

    console.log(nft);

    return (
        <div className={styles.root}>
            <div className={styles.img} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
                <div className={`${styles.rating} ${isVisible && styles.active}`}>
                    <p>
                        R: <span>{nft?.rarityFrom}</span>/5555
                        {/* Поле поставил для примера, не уверен что верно 'rarityFrom' */}
                    </p>
                </div>
                <img src={nft.image.sized} />
            </div>
            <div className={styles.info}>
                <p className={styles.name}>Market Makers #4857</p>
                <p>{nft.name}</p>
                <p>{nft.description}</p>
            </div>
            <WalletConnectionButton />
        </div>
    );
};
