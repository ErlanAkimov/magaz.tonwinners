import styles from "./banner.module.scss";

export const Banner = () => {
    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <h3 className={styles.title}>magaz</h3>
            </div>
            <p className={styles.text}>
                We offer high-quality, carefully selected products. Every item
                is thoroughly inspected to ensure top-notch quality
            </p>
        </div>
    );
};
