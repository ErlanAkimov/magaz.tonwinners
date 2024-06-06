import { Swiper, SwiperSlide } from "swiper/react";
import ContentLoader from "react-content-loader";

import styles from "./colors.module.scss";

import { ProductVariationInterface } from "../../../../Types/ProductTypes";

interface Props {
    variations: ProductVariationInterface[];
    onChange: (variation: number) => void;
    currentVariation: number;
}

export const Colors = ({ variations, onChange, currentVariation }: Props) => {
    return (
        <Swiper slidesPerView={3.6} spaceBetween={6} style={{ padding: "0 15px", marginTop: "26px" }}>
            {(variations || Array(3).fill(null)).map((variation, index) => (
                <SwiperSlide key={index} onClick={() => onChange(index)}>
                    {variation ? (
                        <div className={`${styles.item} ${index === currentVariation && styles.active}`}>
                            <img src={variation.product_card_images[0]} className={styles.img} />
                            <span className={styles.color}>{variation.name}</span>
                        </div>
                    ) : (
                        <Skeleton key={index} />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const Skeleton = () => {
    const defaultAttributes = { rx: "10px", ry: "10px" };
    return (
        <ContentLoader speed={2} width={"100%"} height={"48.69px"} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect y={"0"} x={"0"} width={"100%"} height={"48.69px"} {...defaultAttributes} />
        </ContentLoader>
    );
};
