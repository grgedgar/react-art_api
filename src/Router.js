import { useEffect, useState } from "react";

function Router({setSearchQuery, setUrl, setPage, 
  setOpenId, setOpenItem, setNotFoundIsOpen}) {
  
  const [callRouterCounter, setCallRouterCounter] = useState(0);  
  window.onpopstate = function(event) {

if(event) {
    setCallRouterCounter(callRouterCounter + 1);
  }
}

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const urlSearchQuery = params.get("q"); 
    const urlPage = parseInt(params.get("page"), 10); 
    const urlId = parseInt(params.get("id"), 10); 

    if(urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      search_input.value = urlSearchQuery;
    } else {
      setUrl('https://collectionapi.metmuseum.org/public/collection/v1/objects')
      setSearchQuery(false);
      search_input.value = '';
    }

    if(urlPage) {
      setPage(urlPage);   
    } else {
      setPage(1);
    }

    if(urlId) {      
      setUrl(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${urlId}`);
      setOpenId(urlId);      
    } else {
      setOpenItem(false); 
      setOpenId(false);  
    }

    const url = new URL(window.location);
    if(url.pathname != '/'  
     && url.pathname != '/search'       
     && url.pathname != '/react_art-api/index.html'
     && url.pathname != '/react_art-api/'  
     && url.pathname != '/react_art-api/search'
     && url.pathname != '/build/index.html') {
      url.pathname = '/not-found'
      window.history.pushState({}, "", url);
      setNotFoundIsOpen(true);
    }
  }, [callRouterCounter]); 

}

export default Router;