
import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const SEOMetadata: React.FC<SEOMetadataProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl
}) => {
  const siteUrl = "https://akarfarm.com"; // Replace with your actual domain
  const defaultImage = "/lovable-uploads/ae9d74be-8813-4c4b-b946-cf1190243702.png"; // Default image
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || siteUrl} />
      <meta property="og:image" content={ogImage || `${siteUrl}${defaultImage}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || `${siteUrl}${defaultImage}`} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};
