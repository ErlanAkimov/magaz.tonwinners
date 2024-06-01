import ContentLoader from "react-content-loader";

import { LikeIcon } from "/src/components/icons";

import styles from "./socialfeedback.module.scss";

export const SocialFeedback = ({ likes, comments }) => {
    if (!likes) {
        return <Skeleton />;
    }

    return (
        <div className={styles.root}>
            <div className={[styles.item, styles.active].join(" ")}>
                <LikeIcon isActive />
                <span>{likes || 0}</span>
            </div>
            <div className={styles.item}>
                <span>{comments?.length || 0} reviews</span>
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

const Skeleton = () => {
    const defaultAttributes = { rx: "5px", ry: "5px" };
    return (
        <ContentLoader
            speed={2}
            height={"63px"}
            width={"100vw"}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect
                y={"0"}
                x={"15px"}
                width={"calc((100vw - 30px) * 0.195)"}
                height={"63px"}
                {...defaultAttributes}
            />
            <rect
                y={"0"}
                x={"calc(15px + (100vw - 30px) * 0.195 + 7px)"}
                width={"calc((100vw - 30px) * 0.388)"}
                height={"63px"}
                {...defaultAttributes}
            />
            <rect
                y={"0"}
                x={
                    "calc(15px + (100vw - 30px) * 0.195 + 7px + (100vw - 30px) * 0.388 + 7px)"
                }
                width={"calc((100vw - 30px) * 0.388)"}
                height={"63px"}
                {...defaultAttributes}
            />
        </ContentLoader>
    );
};
