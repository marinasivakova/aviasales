import classes from "./TabsPicker.module.scss";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { updateTab } from "../../Redux/tabReducer";

const TabsPicker = () => {
  let state = useSelector((s)=>s.tab)
  const dispatch = useDispatch();
  
  let defaultClass = `${classes["tabs-filter"]}`;
  const onPress = (e) => {
    switch (e.target.innerHTML) {
      case 'САМЫЙ ДЕШЕВЫЙ': return dispatch(updateTab({ cheap: true, fast: false, optimal: false }));
      case "САМЫЙ БЫСТРЫЙ": return dispatch(updateTab({ cheap: false, fast: true, optimal: false }));
      default: return dispatch(updateTab({ cheap: false, fast: false, optimal: true }));
    }
  };
  return (
    <div className={classes.tabs}>
      <button onClick={onPress} className={defaultClass+ ' ' + cn({[`${classes["tabs-filter__picked"]}`]: state.cheap})}>
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button onClick={onPress} className={defaultClass+ ' ' + cn({[`${classes["tabs-filter__picked"]}`]: state.fast})}>
        САМЫЙ БЫСТРЫЙ
      </button>
      <button onClick={onPress} className={defaultClass+ ' ' + cn({[`${classes["tabs-filter__picked"]}`]: state.optimal})}>
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  );
};
export default TabsPicker;
