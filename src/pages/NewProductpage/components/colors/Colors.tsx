import { Swiper, SwiperSlide } from "swiper/react";

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
            {variations?.map(({ name, product_card_images }, index) => {
                console.log(name);

                return (
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
                );
            })}
        </Swiper>
    );
};
