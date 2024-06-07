import React from "react";
import styles from "./banner.module.scss";

import { WalletConnectionButton } from "../walletconnectionbutton/WalletConnectionButton";

export const Banner = ({ title, description }) => {
    return (
        <div className={styles.root}>
            <p className={styles.title}>{title}</p>
            <p className={styles.desc}>{description}</p>
            <WalletConnectionButton />
        </div>
    );
};
