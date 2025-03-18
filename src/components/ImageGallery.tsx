
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X, Play, ImageOff } from 'lucide-react';
import { isImageUrlValid, getFallbackImageUrl } from '@/data/artworkData';
import { toast } from 'sonner';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  year: string;
  dimensions?: string;
  medium?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
  videoUrl?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  columns = 3,
  videoUrl
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showVideo, setShowVideo] = useState(false);

  // Validate all images when component mounts
  useEffect(() => {
    const validateImages = async () => {
      setIsLoading(true);
      const newErrors: Record<number, boolean> = {};
      
      // Check each image
      for (const image of images) {
        const isValid = await isImageUrlValid(image.src);
        if (!isValid) {
          console.warn(`Invalid image in gallery: ID ${image.id} - ${image.title}`);
          newErrors[image.id] = true;
        }
      }
      
      setImageErrors(newErrors);
      
      // Show toast if some images failed
      const errorCount = Object.keys(newErrors).length;
      if (errorCount > 0) {
        toast.warning(`${errorCount} images couldn't be loaded`, {
          description: "Using placeholder images instead."
        });
      }
      
      setIsLoading(false);
    };
    
    validateImages();
  }, [images]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setShowVideo(false);
  };

  const toggleVideo = () => {
    setShowVideo(prev => !prev);
    if (selectedImage) setSelectedImage(null);
  };

  const closeDialog = () => {
    setSelectedImage(null);
    setShowVideo(false);
  };

  const handleImageError = (imageId: number) => {
    console.warn(`Failed to load gallery image with ID: ${imageId}`);
    setImageErrors(prev => ({...prev, [imageId]: true}));
  };

  const getGridClass = () => {
    switch(columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  const validImages = images.filter(img => !imageErrors[img.id]);

  return (
    <>
      <div className="w-full aspect-[4/3] overflow-hidden mb-4 relative flex items-center justify-center bg-muted/10">
        {isLoading ? (
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        ) : showVideo && videoUrl ? (
          <iframe
            src={videoUrl}
            title="Exhibition Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        ) : (
          validImages.length > 0 && (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={selectedImage ? selectedImage.src : validImages[0].src} 
                alt={selectedImage ? selectedImage.alt : validImages[0].alt}
                className="max-w-full max-h-full object-contain"
                onError={() => {
                  if (selectedImage) {
                    handleImageError(selectedImage.id);
                    // Fallback to first valid image
                    const firstValid = validImages.find(img => img.id !== selectedImage.id);
                    if (firstValid) setSelectedImage(firstValid);
                  }
                }}
              />
            </div>
          )
        )}
        
        {validImages.length === 0 && !showVideo && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <ImageOff className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No valid images available</p>
          </div>
        )}
        
        {videoUrl && (
          <button
            onClick={toggleVideo}
            className="absolute bottom-4 right-4 bg-background/70 text-foreground p-2 rounded-full hover:bg-background/90 transition-colors"
            aria-label={showVideo ? "Show image" : "Show video"}
          >
            <Play size={16} className={showVideo ? "opacity-50" : "opacity-100"} />
          </button>
        )}
      </div>

      <div className={`grid ${getGridClass()} gap-6 md:gap-8`}>
        {validImages.map((image, index) => (
          <div 
            key={image.id} 
            className={`group relative overflow-hidden aspect-square cursor-pointer animate-fade-in ${
              selectedImage?.id === image.id ? 'ring-2 ring-primary' : ''
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleImageClick(image)}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10"></div>
            
            <div className="w-full h-full flex items-center justify-center bg-muted/10">
              <img 
                src={imageErrors[image.id] ? getFallbackImageUrl() : image.src} 
                alt={image.alt}
                loading="lazy"
                onError={() => handleImageError(image.id)}
                className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <h3 className="text-lg font-medium text-white drop-shadow-md">{image.title}</h3>
              <p className="text-sm text-white/90 drop-shadow-md">{image.year}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 bg-background">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full p-2 bg-background/80 text-foreground hover:bg-accent transition-colors">
            <X size={20} />
          </DialogClose>
          
          {selectedImage && (
            <div className="grid md:grid-cols-2 min-h-[60vh]">
              <div className="bg-black flex items-center justify-center p-4">
                <img
                  src={imageErrors[selectedImage.id] ? getFallbackImageUrl() : selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                  onError={() => handleImageError(selectedImage.id)}
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-medium">{selectedImage.title}</h3>
                <p className="text-muted-foreground mt-1">{selectedImage.year}</p>
                
                {selectedImage.medium && (
                  <p className="mt-4 text-sm">
                    <span className="text-muted-foreground">Medium: </span>
                    {selectedImage.medium}
                  </p>
                )}
                
                {selectedImage.dimensions && (
                  <p className="mt-2 text-sm">
                    <span className="text-muted-foreground">Dimensions: </span>
                    {selectedImage.dimensions}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
