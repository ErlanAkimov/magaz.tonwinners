import ContentLoader from "react-content-loader";

import styles from "./sizes.module.scss";

import { singleVariationInterface } from "../../../../Types/ProductTypes";

interface Props {
    data: singleVariationInterface[];
    currentSize: number;
    onChange: (index: number) => void;
}

export const Sizes = ({ data, currentSize, onChange }: Props) => {
    if (!data) {
        return <Skeleton />;
    }

    return (
        <div className={styles.root}>
            {data.map((size, index) => (
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

const Skeleton = () => {
    const defaultAttributes = { rx: "5px", ry: "5px" };
    return (
        <ContentLoader
            speed={2}
            height={"50px"}
            width={"100vw"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect
                y={"10px"}
                x={"15px"}
                width={"40px"}
                height={"40px"}
                {...defaultAttributes}
            />
            <rect
                y={"10px"}
                x={"calc(15px + 40px + 6px)"}
                width={"40px"}
                height={"40px"}
                {...defaultAttributes}
            />
        </ContentLoader>
    );
};
