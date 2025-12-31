import React, { useState } from 'react';

export const ImageGallery = ({ images, propertyName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightbox, setIsLightbox] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="mb-6">
        {/* Main Image */}
        <div
          onClick={() => setIsLightbox(true)}
          className="relative w-full h-96 mb-4 cursor-pointer rounded-lg overflow-hidden bg-gray-100"
        >
          {imageErrors[selectedIndex] ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-medium">Image not available</p>
              </div>
            </div>
          ) : (
            <img
              src={images[selectedIndex]}
              alt={`${propertyName} - image ${selectedIndex + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition"
              onError={() => handleImageError(selectedIndex)}
            />
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition"
          >
            ❮
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition"
          >
            ❯
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition bg-gray-100 ${
                selectedIndex === index ? 'border-indigo-600' : 'border-gray-300'
              }`}
            >
              {imageErrors[index] ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ) : (
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightbox(false)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition"
          >
            ✕
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition"
          >
            ❮
          </button>

          <img
            src={images[selectedIndex]}
            alt={`${propertyName} - fullscreen`}
            className="max-w-full max-h-full"
          />

          <button
            onClick={goToNext}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition"
          >
            ❯
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
