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
<div className=" bg-slate-600 fixed bottom-0 flex w-full h-18 sm:h-10">
  <p className="text-white text-xs p-1 sm:pl-10 sm:mt-2">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies and <a href="/policies" className="text-black">site policies</a>.</p>
    <button onClick={e => { e.preventDefault(); handleClose(); SetCookieButton() }} className="bg-white mx-4 h-6 w-60 sm:w-16 text-xs mt-3 sm:mt-2">I Agree</button>
</div>
);
}

export default CookiesBanner;