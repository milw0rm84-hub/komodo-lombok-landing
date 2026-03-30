import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO Component for komodolomboktrip.com
 * @param {string} title - Page title (e.g., "Whale Shark Tour")
 * @param {string} description - Short summary (max 160 chars)
 * @param {string} image - Path to image (e.g., "/assets/img/boat.jpg")
 * @param {string} url - Absolute URL of the page
 */
const SEO = ({ title, description, image, url, type = 'website' }) => {
  const siteName = "Komodo Lombok Trip";
  const fullTitle = `${title} | ${siteName}`;
  
  // Logic to ensure the image URL is absolute for social media bots
  const absoluteImage = image?.startsWith('http') 
    ? image 
    : `https://komodolomboktrip.com${image}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
};

export default SEO;