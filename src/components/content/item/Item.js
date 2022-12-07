import ImageViewerWrapper from "./ImageViewer"
import { useState } from "react";
import PlaceholderLoading from 'react-placeholder-loading'


function Item({openItem, setOpenItem, setOpenId, openId}) {
  const [primaryImageClass, setPrimaryImageClass] = useState('hidden');
  const [openImageIndex, setOpenImageIndex] = useState(false);

  function GoBackLink() {
    return (
      <a id="go_back_link" className="go-back-link" onClick={goBackHandleClick}>&#706; &nbsp; Back to the list</a>
    )
  }
  
  function PrimaryImage() {
    if(openItem.primaryImage) {
      return (
        <img className={`primary-image ${primaryImageClass}`} src={openItem.primaryImage} alt={openItem.title} onLoad={() => setPrimaryImageClass('shown')} />
      )
    } else {
      return (
        <div className="no-image-div">No image</div>
      )
    }
  }

  function goBackHandleClick(e) {
    if(e.currentTarget.id == 'go_back_link') {
      setPrimaryImageClass('hidden');
      setOpenItem(false);
      setOpenId(false);
      history.back();
    }
  }

  if(openItem) {
    return (
      <div className="item-window">
        <GoBackLink />
        <div className='primary-image-container'>
          {primaryImageClass == 'hidden' && openItem.primaryImage && (
            <PlaceholderLoading shape="rect" />
          )}
          <PrimaryImage />
          <div className='item-title-cover'></div>
          <p className='item-title'>{openItem.title}</p>
        </div>
        <div className='additional-images-container'>
          {openItem.additionalImages.map((item, index) => (
            <img key={index} src={item} className='thumbnail-image' onClick={() => setOpenImageIndex(index)}/>
          ))}
        </div>
        <div className='description-container'>
          <p className="description-label">Title</p>
          <h3 className="item-description border-bottom">{openItem.title}</h3>
          <p className="description-label">Artist</p>
          <h3 className="item-description border-bottom">{openItem.artistDisplayName ? openItem.artistDisplayName : "Unknown"}</h3>
          <p className="description-label">Object Type</p>
          <h3 className="item-description border-bottom">{openItem.objectName}</h3>
          <p className="description-label">Measurements</p>
          <h3 className="item-description border-bottom">{openItem.dimensions ? openItem.dimensions : 'Unknown'}</h3>
          <p className="description-label">Material</p>
          <h3 className="item-description border-bottom">{openItem.medium}</h3>
          <p className="description-label">Year(s) of creation</p>
          <h3 className="item-description">{openItem.objectDate}</h3>
        </div>
        <GoBackLink />
        <ImageViewerWrapper openItem={openItem} openImageIndex={openImageIndex} 
          setOpenImageIndex={setOpenImageIndex} />
      </div>
    )
  } else if(!openItem){
    return ('')
  }
}

export default Item;