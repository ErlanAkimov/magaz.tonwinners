import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./colors.module.scss";
import { IColor } from "../product/Product";
import { useState } from "react";

interface Props {
    data: IColor[];
}

export const Colors = ({ data }: Props) => {
    const [activeColor, setActiveColor] = useState<number>(0);

    return (
        <Swiper
            slidesPerView={3.6}
            spaceBetween={6}
            style={{ padding: "0 15px" }}
        >
            {data.map((color, index) => (
                <SwiperSlide
                    key={color.id}
                    onClick={() => setActiveColor(index)}
                >
                    <div
                        className={[
                            `${styles.item} ${
                                index === activeColor ? styles.active : ""
                            }`,
                        ].join(" ")}
                    >
                        <img src={color.img} className={styles.img} />
                        <span className={styles.color}> {color.value}</span>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
