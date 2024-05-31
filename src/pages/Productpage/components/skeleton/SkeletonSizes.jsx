import React from 'react';
import ContentLoader from 'react-content-loader';
import s from '../skeleton/skeletonProduct.module.scss'

const SkeletonSizes = () => {
  return (
      <div style={{ display: 'flex', paddingLeft: 10, marginTop: 10 }}>
        {[...Array(6)].map((_, index) => (
          <ContentLoader
            key={index}
            width={40}
            height={40}
            viewBox="0 0 40 40"
            style={{ marginRight: 6 }}
            className={s.shine}
          >
            <div className={s.shine}><rect x="0" y="0" rx="10" ry="10" width="40" height="40" /></div>
          </ContentLoader>
        ))}
      </div>
  );
};

export default SkeletonSizes;
