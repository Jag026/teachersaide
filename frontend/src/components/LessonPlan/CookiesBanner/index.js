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
<div className=" bg-blue-800 py-8 fixed bottom-0 flex w-full">
  <p className="text-white text-2xl pl-10">We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies and <a href="/policies">site policies</a>.</p>
    <button onClick={e => { e.preventDefault(); handleClose(); SetCookieButton() }} className="bg-white ml-4 py-1 px-4 w-24">Close</button>
</div>
);
}

export default CookiesBanner;