import React from 'react';

interface GoogleMapEmbedProps {
  query: string;
  height?: number;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({ query, height = 400 }) => {
  if (!query || query.trim() === '') {
    return (
      <div
        className="w-full bg-gray-100 rounded-lg shadow border border-gray-300 flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <p className="text-gray-600 font-semibold">Map not available</p>
      </div>
    );
  }

  const encodedQuery = encodeURIComponent(query.trim());
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedQuery}&output=embed`;

  return (
    <div className="w-full rounded-lg shadow overflow-hidden">
      <iframe
        width="100%"
        height={height}
        style={{ border: 0, borderRadius: '0.5rem' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapEmbedUrl}
        title={`Map of ${query}`}
      ></iframe>
    </div>
  );
};
