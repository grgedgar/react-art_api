import FetchedItems from './Fetch';
import Caption from "./Caption";
import ItemWindow from "./item/Item"

function Content ({caption, itemsTotal, url, setUrl, pageIsLoaded, setPageIsLoaded,
  page, openId, setOpenId, setItemsTotal, setPagesTotal, openItem, setOpenItem, 
  searchQuery, notFoundIsOpen }) {

    return (
      <main>
        <div style={{display: openItem ? 'none' : 'block' }}>
          <Caption caption={caption} itemsTotal={itemsTotal} url={url}
            pageIsLoaded={pageIsLoaded} />
          <FetchedItems url={url} setUrl={setUrl} page={page} 
            setOpenId={setOpenId} setItemsTotal={setItemsTotal} 
            setPagesTotal={setPagesTotal} pageIsLoaded={pageIsLoaded}
            setPageIsLoaded={setPageIsLoaded} setOpenItem={setOpenItem} 
            searchQuery={searchQuery} notFoundIsOpen={notFoundIsOpen} />
        </div>
        <ItemWindow openItem={openItem} setOpenItem={setOpenItem} openId={openId} 
          setOpenId={setOpenId}/>
      </main>
    )
}

export default Content;