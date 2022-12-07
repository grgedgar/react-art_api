import ImageViewerCore from "react-simple-image-viewer";
import { useState, useEffect } from "react";

function Viewer({openItem, openImageIndex, setOpenImageIndex}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if(openImageIndex !== false) {
      document.body.style.overflow = "hidden"
      setCurrentImage(openImageIndex);
      setIsViewerOpen(true);
    }
  }, [openImageIndex]);

  const closeImageViewer = () => {
    document.body.style.overflow = "visible"
    setOpenImageIndex(false);
    setCurrentImage(false);
    setIsViewerOpen(false);
  };

  return (
    <div>        
      {isViewerOpen && (
        <ImageViewerCore
          src={openItem.additionalImages.map(item => item)}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
          closeOnClickOutside={true}
        />
      )}        
    </div>
  )
}

export default Viewer;