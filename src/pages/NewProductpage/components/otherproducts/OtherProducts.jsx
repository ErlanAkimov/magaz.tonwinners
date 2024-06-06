// dependencies
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// styles
import styles from "./other.module.scss";

// components
import { ProductCard } from "/src/components/ProductCard/ProductCard";
import { Skeleton } from "/src/components/ProductCard/components/skeleton/Skeleton";

export const OtherProducts = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true);
    // const { productId } = useParams();
    // const products = useSelector((state) => state.products.productsList);
    // const currentProduct = useSelector(
    //     (state) =>
    //         state.products.productsList.filter((a) => a._id === productId)[0]
    // );

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return (
        <div className={styles.productLine}>
            <h4 className={styles.prodTitle}>Seller's Other Items</h4>
            <div className={styles.products}>
                {data.map((product, index) =>
                    isLoading ? (
                        <Skeleton key={index} />
                    ) : (
                        <ProductCard key={index} data={product} />
                    )
                )}
            </div>
        </div>
    );
};
