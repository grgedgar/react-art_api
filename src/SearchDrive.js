import { useEffect } from "react";

function SearchDrive({setUrl, setCaption, setPageIsLoaded, searchQuery, 
  openId}) {


  useEffect(() => {
    if(searchQuery){
      setPageIsLoaded(false);
      setUrl(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}`)
      setCaption({spanContent: searchQuery})
      const url = new URL(window.location);
      if(url.pathname == '/' || url.pathname == '/search') { 
        url.pathname = '/search'
      }
      if(url.pathname.startsWith('/react_art-api/')) { 
        url.pathname = '/react_art-api/search'
      }
      url.searchParams.set('q', searchQuery);
      if(!openId){
        url.searchParams.delete('id');
      }
      window.history.pushState({}, "", url);
    }
  }, [searchQuery])

}

export default SearchDrive;