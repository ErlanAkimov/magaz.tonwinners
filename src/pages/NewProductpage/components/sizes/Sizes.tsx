import React, { useState } from "react";
import styles from "./sizes.module.scss";
import { singleVariationInterface } from "../../../../Types/ProductTypes";

interface propsInterface {
    sizes: singleVariationInterface[];
}

export const Sizes: React.FC<propsInterface> = ({ sizes }) => {
    const [activeSize, setActiveSize] = useState<number>(0);

    return (
        <div className={styles.root}>
            {!!sizes.length &&
                sizes.map((size, index) => (
                    <div
                        key={index}
                        className={[
                            `${styles.size} ${
                                index === activeSize ? styles.active : ""
                            }`,
                        ].join(" ")}
                        onClick={() => setActiveSize(index)}
                    >
                        {size.name}
                    </div>
                ))}
        </div>
    );
};
