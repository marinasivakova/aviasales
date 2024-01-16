import Logo from "../Logo";
import Filter from "../Filter";
import ShowMoreButton from "../ShowMoreButton";
import TabsPicker from "../TabsPicker";
import TicketList from "../TicketList";
import classes from './App.module.scss';
import { useState } from "react";

const App = () => {
  let [count, setCount] = useState(1);;
  const pressButton = () => {
    setCount((v)=> v+1)
    return count
  }
    return (
      <div className={classes.app}>
        <Logo />
        <div className={classes.wrapper}>
          <Filter />
          <div className={classes.tab}>
            <TabsPicker />
            <TicketList buttonData={count}/>
            <ShowMoreButton showMore={pressButton}/>
          </div>
        </div>
      </div>
    );
  };

  export default App;