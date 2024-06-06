import styles from "./sizes.module.scss";
import { singleVariationInterface } from "../../../../Types/ProductTypes";

interface Props {
    data: singleVariationInterface[];
    currentSize: number;
    onChange: (index: number) => void;
}

export const Sizes = ({ data, currentSize, onChange }: Props) => {
    return (
        <div className={styles.root}>
            {!!data.length &&
                data.map((size, index) => (
                    <div
                        key={index}
                        className={[
                            `${styles.size} ${
                                index === currentSize ? styles.active : ""
                            }`,
                        ].join(" ")}
                        onClick={() => onChange(index)}
                    >
                        {size.name}
                    </div>
                ))}
        </div>
    );
};
