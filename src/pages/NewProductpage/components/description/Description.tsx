import React, { useEffect, useState } from "react";
import styles from "./description.module.scss";
import ContentLoader from "react-content-loader";

export const Description: React.FC<{ text: string }> = ({ text }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    useEffect(() => setIsOpen(false), [text]);

    if (!text) {
        return <Skeleton />;
    }

    return (
        <div className={styles.wrapper}>
            <h3>Description</h3>
            <p
                className={`${styles.description} ${
                    isOpen ? styles.opened : null
                }`}
                dangerouslySetInnerHTML={{ __html: text }}
            />
            {!isOpen && (
                <div className={styles.readmore} onClick={handleOpen}>
                    Read more
                </div>
            )}
        </div>
    );
};

const Skeleton = () => {
    const defaultAttributes = { rx: "5px", ry: "5px" };

    return (
        <ContentLoader
            speed={2}
            height={"121px"}
            width={"100vw"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect
                y={"22px"}
                x={"15px"}
                width={"calc(100vw - 30px)"}
                height={"99px"}
                {...defaultAttributes}
            />
        </ContentLoader>
    );
};
