import ContentLoader from "react-content-loader";

export const Skeleton = () => (
    <ContentLoader
        speed={2}
        viewBox="0 0 175 245"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="16" ry="16" width="175" height="175" />
        <rect x="0" y="186" rx="5" ry="5" width="133" height="13.5" />
        <rect x="0" y="206" rx="5" ry="5" width="111" height="17" />
        <rect x="0" y="228" rx="5" ry="5" width="66" height="11" />
    </ContentLoader>
);
