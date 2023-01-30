import React from 'react';

const CookiesBanner = () => {
const [showBanner, setShowBanner] = React.useState(true);

const handleClose = () => {
setShowBanner(false);
}

if (!showBanner) {
return null;
}
  
  if (document.cookie.indexOf("cookieUse") !== -1) {
    handleClose();
}
const SetCookieButton = () => {
    // set the cookie with a expiration date of one week from now
    let date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = "cookieUse=agreed; expires=" + date.toGMTString();
}
  
return (
<div className=" bg-blue-500 fixed bottom-0 flex w-full h-8">
  <p className="text-white text-xs pl-10 mt-2">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies and <a href="/policies" className="text-black">site policies</a>.</p>
    <button onClick={e => { e.preventDefault(); handleClose(); SetCookieButton() }} className="bg-white mx-4 h-4 w-16 text-xs mt-2">I Agree</button>
</div>
);
}

export default CookiesBanner;