import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  propertyName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, propertyName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightbox, setIsLightbox] = useState(false);

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
          className="relative w-full h-96 mb-4 cursor-pointer rounded-lg overflow-hidden"
        >
          <img
            src={images[selectedIndex]}
            alt={`${propertyName} - image ${selectedIndex + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
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
              className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition ${
                selectedIndex === index ? 'border-indigo-600' : 'border-gray-300'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
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

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
