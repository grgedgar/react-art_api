import { useEffect } from "react";


function NotFound({setNotFoundIsOpen, reset, isReset, setIsReset, setUrl}) {

  useEffect(() => {
    setUrl(false);
  }, []);

  return (
    <div>
      <h2>Page not found</h2>
      <a href="/" onClick={reset}>Go to the home page</a>
    </div>
  );
}

export default NotFound;