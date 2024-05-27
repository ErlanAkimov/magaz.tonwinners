import { Swiper, SwiperSlide } from "swiper/react";
import ContentLoader from "react-content-loader";

import styles from "./colors.module.scss";

import { variationInterface } from "../../../../Types/ProductTypes";

interface Props {
    variations: variationInterface[];
    onChange: (variation: number) => void;
    currentVariation: number;
}

export const Colors = ({ variations, onChange, currentVariation }: Props) => {
    return (
        <Swiper
            slidesPerView={3.6}
            spaceBetween={6}
            style={{ padding: "0 15px" }}
        >
            {variations ? (
                variations?.map(({ name, product_card_images }, index) => (
                    <SwiperSlide key={index} onClick={() => onChange(index)}>
                        <div
                            className={[
                                `${styles.item} ${
                                    index === currentVariation
                                        ? styles.active
                                        : ""
                                }`,
                            ].join(" ")}
                        >
                            <img
                                src={product_card_images[0]}
                                className={styles.img}
                            />
                            <span className={styles.color}>{name}</span>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <Skeleton />
            )}
        </Swiper>
    );
};

const Skeleton = () => {
    const defaultAttributes = { rx: "5px", ry: "5px" };
    return (
        <ContentLoader
            speed={2}
            width={"100vw"}
            height={"74px"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect
                y={"20px"}
                x={"0"}
                width={"126px"}
                height={"48px"}
                {...defaultAttributes}
            />
            <rect
                y={"20px"}
                x={"calc(126px + 6px)"}
                width={"126px"}
                height={"48px"}
                {...defaultAttributes}
            />
        </ContentLoader>
    );
};
