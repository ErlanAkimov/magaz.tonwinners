import { useState, useEffect } from "react";

// styles
import styles from "./products.module.scss";

// utils
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import xApi from "/src/axios";

// components
import { ProductCard } from "/src/components/ProductCard/ProductCard";
import { NftCard } from "/src/components/NftCard/NftCard";

export const Products = () => {
    // const { ref, products } = useInfiniteScroll();
    const [nftData, setNftData] = useState(null);

    const fetchNft = async () => {
        try {
            const response = await xApi("/bundles/1");

            setNftData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNft();
    }, []);

    return (
        <>
            <h2 className={styles.catalogTitle}>New from MAGAZ</h2>
            <div className={styles.catalog}>
                {nftData &&
                    nftData.nft_items.map(
                        (data, index) => <NftCard key={index} data={data} />
                        // data.category === "nft_bundle" ? <NftCard key={index} data={data} /> : <ProductCard key={index} data={data} />
                    )}
                {/* <div ref={ref} /> */}
            </div>
        </>
    );
};
