import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { likeToggler } from "/src/redux/slice/userSlice";

import { LikeIcon } from "/src/components/icons";

import styles from "./like.module.scss";

export const Like = ({ productId, className }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [like, setLike] = useState(false);

    const likeTogglesHandler = () => {
        console.log(productId);
        dispatch(likeToggler(productId));
    };

    useEffect(() => {
        if (user) {
            const s = user.likedProducts.filter((a) => a === productId);
            s.length === 0 ? setLike(false) : setLike(true);
        }
    }, [user, productId]);

    return (
        <div
            className={[styles.root, className].join(" ")}
            onClick={likeTogglesHandler}
        >
            <LikeIcon isActive={like} />
        </div>
    );
};
