
function Header({ setSearchQuery, setNotFoundIsOpen, setPage, reset,
  setOpenId, setOpenItem }) {

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if(e.target.value) {
        passSearchQuery();
      }
    }
  }

  function passSearchQuery() {
    if(search_input.value) {
      setPage(1);
      setSearchQuery(search_input.value);      
      setNotFoundIsOpen(false);
      setOpenId(false);
      setOpenItem(false);
    }
  }

  return (
    <header>
      <div className="header-div">
        <a className="logo-link" onClick={reset} title="Art API Home">
          <img className="logo" src="./images/logo.png"></img>
        </a>
        <span className="header-title">Art API</span>
        <div className="search-container">
          <input type="search" className="search-input" 
            id="search_input" placeholder="Please type in your search" 
            onKeyDown={handleKeyDown} title="Please type in your search"/>
          <button className="search-button" onClick={passSearchQuery} title="Start search">Search</button>
        </div>
      </div>
    </header>
  )
}

export default Header;