const reportWebVitals = (onPerfEntry) => {
  // Check if a valid function is passed for performance reporting
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Dynamically import the 'web-vitals' library to measure various web performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      
      // Report Cumulative Layout Shift (CLS)
      getCLS(onPerfEntry);
      
      // Report First Input Delay (FID)
      getFID(onPerfEntry);
      
      // Report First Contentful Paint (FCP)
      getFCP(onPerfEntry);
      
      // Report Largest Contentful Paint (LCP)
      getLCP(onPerfEntry);
      
      // Report Time to First Byte (TTFB)
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
