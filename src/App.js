import * as React from "react";
import './App.css';
import { useState } from "react";
import HeaderItems from "./components/Header";
import Content from './components/content/Content';
import Pagination from './components/Pagination';
import SearchDrive from "./SearchDrive";
import NotFound from "./NotFound";
import Router from "./Router";

function App() {  
  const [url, setUrl] = useState(false);
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(false);  
  const [itemsTotal, setItemsTotal] = useState(null);
  const [pagesTotal, setPagesTotal] = useState(null);
  const [caption, setCaption] = useState(null);
  const [pageIsLoaded, setPageIsLoaded] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const [notFoundIsOpen, setNotFoundIsOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);
  


  function reset() {
    if(search_input.value) {
      search_input.value = '';
    }    
    setNotFoundIsOpen(false);
    setSearchQuery(false);
    setPage(1);
    setOpenItem(false);
    if(url !== 'https://collectionapi.metmuseum.org/public/collection/v1/objects') {
      setPageIsLoaded(false);
      setUrl('https://collectionapi.metmuseum.org/public/collection/v1/objects')
    }
    const currentUrl = new URL(window.location);
    if(currentUrl.pathname == '/' || currentUrl.pathname == '/search') { 
      window.history.pushState({}, "", '/')
    }
    if(currentUrl.pathname.startsWith('/react_art-api/')) { 
        window.history.pushState({}, "", '/react_art-api/')
    }
    setIsReset(true);
  }


  return (
    <div>
      <Router setSearchQuery={setSearchQuery} setUrl={setUrl} setPage={setPage}
        setOpenId={setOpenId} setOpenItem={setOpenItem} 
        setNotFoundIsOpen={setNotFoundIsOpen} />

      <HeaderItems setSearchQuery={setSearchQuery} 
        setNotFoundIsOpen={setNotFoundIsOpen} setPage={setPage} reset={reset}
        setOpenId={setOpenId} setOpenItem={setOpenItem} />

      <Content caption={caption} itemsTotal={itemsTotal} url={url} setUrl={setUrl}
        page={page} openId={openId} setOpenId={setOpenId} 
        setItemsTotal={setItemsTotal} setPagesTotal={setPagesTotal} 
        pageIsLoaded={pageIsLoaded} setPageIsLoaded={setPageIsLoaded} 
        openItem={openItem} setOpenItem={setOpenItem} searchQuery={searchQuery} 
        notFoundIsOpen={notFoundIsOpen} />

      <Pagination page={page} setPage={setPage} pagesTotal={pagesTotal}
        pageIsLoaded={pageIsLoaded} setPageIsLoaded={setPageIsLoaded} openItem={openItem} 
        notFoundIsOpen={notFoundIsOpen} />
      
      <SearchDrive setCaption={setCaption} setPageIsLoaded={setPageIsLoaded} 
        openId={openId} url={url} setUrl={setUrl} 
        searchQuery={searchQuery} />     

      {notFoundIsOpen && (
        <NotFound setNotFoundIsOpen={setNotFoundIsOpen} reset={reset} 
          isReset={isReset} setIsReset={setIsReset} setUrl={setUrl} /> 
      )}
    </div>
  );
}

export default App;