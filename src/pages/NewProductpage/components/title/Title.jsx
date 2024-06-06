import styles from "./title.module.scss";

import ContentLoader from "react-content-loader";

export const Title = ({ name, seller }) => {
    if (!name || !seller) {
        return <Skeleton />;
    }

    return (
        <div className={styles.title}>
            <h1>{name}</h1>
            <p className={styles.magaz}>{seller}</p>
        </div>
    );
};

const Skeleton = () => {
    const defaultAttributes = { rx: "5px", ry: "5px" };

    return (
        <ContentLoader
            speed={2}
            height={"38px"}
            width={"100vw"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect
                y={"20px"}
                x={"15px"}
                width={"110px"}
                height={"18px"}
                {...defaultAttributes}
            />
            <rect
                y={"20px"}
                x={"calc(100vw - 15px - 125px)"}
                width={"125px"}
                height={"18px"}
                {...defaultAttributes}
            />
        </ContentLoader>
    );
};
