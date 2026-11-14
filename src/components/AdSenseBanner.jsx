import React, { useEffect } from 'react';

const AdSenseBanner = ({ slotId, format = 'auto', responsive = 'true' }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className="my-4 overflow-hidden text-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2665464163357677"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

export default AdSenseBanner;