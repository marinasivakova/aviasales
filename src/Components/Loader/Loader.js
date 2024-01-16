import React from 'react';
import classes from '../TicketList/TicketList.module.scss'
    
function Loader() {
  return (
    <div className={classes["message-container"]}>
      <h2 className={classes.message}>Loading...</h2>
    </div>
  );
}

export default Loader;