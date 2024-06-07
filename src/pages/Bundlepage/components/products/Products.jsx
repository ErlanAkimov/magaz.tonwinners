import React, { useState, useEffect } from "react";
import styles from "./products.module.scss";

import xApi from "/src/axios";

import { NftCard } from "/src/components/NftCard/NftCard";

export const Products = () => {
    const [nfts, setNfts] = useState(null);

    const fetchNfts = async () => {
        try {
            const response = await xApi("/bundles/1");

            setNfts(response.data.nft_items);
        } catch (error) {}
    };

    useEffect(() => {
        fetchNfts();
    }, []);

    return <div className={styles.catalog}>{nfts && nfts.map((nft, index) => <NftCard key={index} data={nft} />)}</div>;
};
