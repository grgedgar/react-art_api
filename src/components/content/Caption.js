function Caption ({caption, itemsTotal, url, pageIsLoaded}) {

  function RenderCaption () {
    if(url) {
      if(url.includes('collectionapi.metmuseum.org/public/collection/v1/search?q=')) {
        if(pageIsLoaded) {
          return (
            <h2 className="itemlist-caption">Found {itemsTotal} results for:
              <span className="itemlist-caption-query"> {caption.spanContent}</span>
            </h2>
          )
        }
      } else {
        return (
          <h2 className="itemlist-caption">All artwork</h2>
        )
      }
    }
  }

  return(
    <RenderCaption />
  )
}

export default Caption;