import styles from "./title.module.scss";

export const Title = ({ name, seller }) => {
    return (
        <div className={styles.title}>
            <h1>{name}</h1>
            <p className={styles.magaz}>{seller}</p>
        </div>
    );
};
