import { useState, useEffect } from "react";

function Fetch({ url, setUrl, page, setOpenId, setItemsTotal, setPagesTotal, pageIsLoaded, 
  setPageIsLoaded, setOpenItem, searchQuery, notFoundIsOpen }) {
    const [error, setError] = useState(null);
    const [firstUseEffectIsLoaded, setFirstUseEffectIsLoaded] = useState(false);
    const [ids, setIds] = useState([]);
    const [items, setItems] = useState([]);  
    const [callMapItemsCounter, setCallMapItemsCounter] = useState(0);  
    
  
    useEffect(() => {
      setPageIsLoaded(false);
      if(url) {
        setFirstUseEffectIsLoaded(false);
        fetch(url)
          .then(res => res.json())
          .then(
            (response) => {
              if(url.includes('collectionapi.metmuseum.org/public/collection/v1/objects/')) {
                setOpenItem(response);
                if(!searchQuery) {
                  setUrl(`https://collectionapi.metmuseum.org/public/collection/v1/objects`); 
                } 
                return ;
              }
              const orderedIds = response.objectIDs             
                setIds(orderedIds); 
              setItemsTotal(response.total)
              setPagesTotal(Math.ceil(response.total / 9));
              setFirstUseEffectIsLoaded(true);
              setCallMapItemsCounter(callMapItemsCounter + 1);  
            },
            (error) => {
              setFirstUseEffectIsLoaded(true);
              setError(error);
            }
          )
      }
    }, [url])
  
    useEffect(() => {
      if (firstUseEffectIsLoaded) {
        fetchPageItems().then(
          (result) => {
            setPageIsLoaded(true);
            setItems(result);
            window.scrollTo(0, 0);
          },
          (error) => {
            setPageIsLoaded(true);
            setError(error);
          }
        )
    }
    }, [page, callMapItemsCounter])
  
    function fetchPageItems() {
      let firstPageId;
      let lastPageId;
        firstPageId = page * 9 - 9;
        lastPageId = page * 9;
      const pageIds = ids.slice(firstPageId, lastPageId);
      const pageItems = pageIds
        .map((item) => fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`)
          .then(resp => resp.json())
        );
      return Promise.all(pageItems); 
    }
  
    function handleItemClick(e) {
      const openItem = items.find((item) => item.objectID == e.currentTarget.id);
      setOpenItem(openItem);
      window.scrollTo(0, 0);
      setOpenId(e.currentTarget.id);
      const url = new URL(window.location);
      url.searchParams.set('id', e.currentTarget.id);
      window.history.pushState({}, "", url)
    }
    
    function ItemImage(item) {
      if (item.item.primaryImageSmall) {
        return (
          <img src={item.item.primaryImageSmall} alt={item.item.title + " By " + item.item.artistDisplayName} />
        )
      } else {      
        return (
          <p className="no-image-text">No image</p>
        )
      }
    }
  
    function ItemAuthor(item) {
      if (item.item.artistDisplayName) {
        return (
          <span className='author'>{item.item.artistDisplayName}</span>
        )
      } else {      
        return (
          <span className='author'>Unknown artist</span>
        )
      }
    }

    function ItemTitle(item) {
      if (item.item.title) {
        if (item.item.title.length > 55) {
          const shortenedTitle = `${item.item.title.substring(0, 55)}...`
          return (
            <p className='item-title'>{shortenedTitle}</p>
          )
        }
      }
      return (
        <p className='item-title'>{item.item.title}</p>
      )
    }
  
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (notFoundIsOpen) {
      return ;
    } else { 
      return (
        <div>
          <div className="list-container">            
          {pageIsLoaded ? 
            items.map(item => (
              <div id={item.objectID} key={item.objectID} onClick={handleItemClick} title={item.title}>
                <ItemImage item={item} /> 
                <ItemAuthor item={item} />              
                <div className='item-title-cover'></div>
                <ItemTitle item={item} />                
              </div>
            ))
            :
            <span>Loading</span>                   
          }
          </div>
        </div>
      );
    }
}


export default Fetch;