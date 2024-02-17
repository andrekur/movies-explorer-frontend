import React, { useState, useEffect } from "react";

function Notification({text, isSuccess}) {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShow(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  })

  return (
    <div className={`notification ${ isShow ? 'notification_visible' : ''} ${isSuccess ? 'notification_type-success' : 'notification_type-err'}`}>
      <a>{text}</a>
    </div>
  )
}

export default Notification;