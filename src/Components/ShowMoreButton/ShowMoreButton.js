import { useSelector } from "react-redux";
import classes from "./ShowMoreButton.module.scss";

const ShowMoreButton = ({ showMore }) => {
  let button = useSelector((s) => s.button.button);
  return button ? (
    <button
      className={classes["show-more"]}
      onClick={() => {
        showMore();
      }}
    >
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
    </button>
  ) : null;
};
export default ShowMoreButton;
