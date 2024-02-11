import React, { useState, useEffect } from "react";

function ErrorNotification({errText}) {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShow(false);
    }, 5000);
    return () => clearTimeout(timeoutId);
  })

  return (
    <div className={`error-notification ${ isShow ? 'error-notification_visible' : ''}`}>
      <a>{errText}</a>
    </div>
  )
}

export default ErrorNotification;