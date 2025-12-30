import React from 'react';

interface GoogleMapEmbedProps {
  query: string;
  height?: number;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ query, height = 400 }) => {
  const heightClass = height === 300
    ? 'h-[300px]'
    : height === 350
      ? 'h-[350px]'
      : height === 450
        ? 'h-[450px]'
        : height === 500
          ? 'h-[500px]'
          : 'h-[400px]';

  if (!query || query.trim() === '') {
    return (
      <div
        className={`w-full bg-gray-100 rounded-lg shadow border border-gray-300 flex items-center justify-center map-container ${heightClass}`}
      >
        <p className="text-gray-600 font-semibold">Map not available</p>
      </div>
    );
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;

  return (
    <div className={`w-full rounded-lg shadow overflow-hidden map-container ${heightClass}`}>
      <iframe
        className="w-full h-full map-frame"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapEmbedUrl}
        title={`Map of ${query}`}
      ></iframe>
    </div>
  );
};
