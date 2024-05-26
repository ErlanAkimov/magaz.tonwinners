import styles from "./socialfeedback.module.scss";

import { LikeIcon } from "/src/icons/like/LikeIcon";

interface Props {
    likes: number;
}

export const SocialFeedback = ({ likes }: Props) => {
    return (
        <div className={styles.root}>
            <div className={[styles.item, styles.active].join(" ")}>
                <LikeIcon isActive />
                <span>{likes}</span>
            </div>
            <div className={styles.item}>
                <span>17 reviews</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="7.000000"
                    height="13.000000"
                    viewBox="0 0 7 13"
                    fill="none"
                >
                    <desc>Created with Pixso.</desc>
                    <defs />
                    <path
                        id="Vector 1"
                        d="M0.5 1L5.5 6L0.5 11"
                        stroke="#707579"
                        strokeOpacity="1.000000"
                        strokeWidth="2.000000"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <div className={styles.item}>
                <span>23 questions</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="7.000000"
                    height="13.000000"
                    viewBox="0 0 7 13"
                    fill="none"
                >
                    <desc>Created with Pixso.</desc>
                    <defs />
                    <path
                        id="Vector 1"
                        d="M0.5 1L5.5 6L0.5 11"
                        stroke="#707579"
                        strokeOpacity="1.000000"
                        strokeWidth="2.000000"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
};
