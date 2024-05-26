import ContentLoader from "react-content-loader";

export const Skeleton = () => {
    // const ratio = 2.195100535604531;
    const ratio = 2.272727272727273;

    const value = (value) => value * ratio;

    const defaultAttributes = { rx: value(5), ry: value(5) };

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 1000 3000"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" width="100%" height={value(440)} />
            <rect
                x={value(15)}
                y={value(460)}
                width={value(100)}
                height={value(17.6)}
                {...defaultAttributes}
            />
            <rect
                x={`calc(100% - ${value(120)}px - ${value(15)}px)`}
                y={value(460)}
                width={value(120)}
                height={value(28)}
                {...defaultAttributes}
            />
            {/* <rect
                x={value(15)}
                y={value(498)}
                width={value(120)}
                height={value(39)}
                {...defaultAttributes}
            />
            <rect
                x={`calc(100% - ${value(100)}px - ${value(15)}px)`}
                y={value(498)}
                width={value(100)}
                height={value(42)}
                {...defaultAttributes}
            /> */}
            {/* <rect
                x={value(15)}
                y={value(553)}
                width={value(121)}
                height={value(48)}
                {...defaultAttributes}
            />
            <rect
                x={`calc(${value(15)}px + ${value(121)}px + ${value(6)}px)`}
                y={value(553)}
                width={value(121)}
                height={value(48)}
                {...defaultAttributes}
            />
            <rect
                x={value(15)}
                y={value(611)}
                width={value(40)}
                height={value(40)}
                {...defaultAttributes}
            />
            <rect
                x={`calc(${value(15)}px + ${value(40)}px + ${value(6)}px)`}
                y={value(611)}
                width={value(40)}
                height={value(40)}
                {...defaultAttributes}
            />
            <rect
                x={value(15)}
                y={value(671)}
                width={`calc(100% - ${value(30)}px)`}
                height={value(1)}
            />
            <rect
                x={value(15)}
                y={value(691)}
                width={value(70)}
                height={value(65)}
                {...defaultAttributes}
            />
            <rect
                x={value(91)}
                y={value(691)}
                width={value(164)}
                height={value(65)}
                {...defaultAttributes}
            />
            <rect
                x={value(261)}
                y={value(691)}
                width={value(164)}
                height={value(65)}
                {...defaultAttributes}
            /> */}
        </ContentLoader>
    );
};
