import { Skeleton } from "../skeleton/Skeleton";

export const Skeletons = ({ size = 1 }) => {
    console.log(size, Array(size).fill());
    return Array(size)
        .fill()
        .map((_, index) => <Skeleton key={index} />);
};
