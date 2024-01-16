import { useDispatch, useSelector } from "react-redux";
import classes from "./filter.module.scss";
import { updateFilter } from "../../Redux/filterReducer";

const Filter = () => {
  let state = useSelector((s) => s.filter);
  const dispatch = useDispatch();

  const onPress = (e) => {
    let filters = { ...state.filters };
    let label = e.target.labels[0].htmlFor;
    if (e.target.labels) {
      switch (label) {
        case "transfer-all":
          if (!e.target.checked) {
            dispatch(
              updateFilter({
                "transfer-all": false,
                filters: {
                  "transfer-one": false,
                  "transfer-two": false,
                  "transfer-three": false,
                  "transfer-none": false,
                },
              })
            );
            break;
          }
           dispatch(
            updateFilter({
              "transfer-all": true,
              filters: {
                "transfer-one": true,
                "transfer-two": true,
                "transfer-three": true,
                "transfer-none": true,
              },
            })
          );
          break;
        case "transfer-one":
          filters["transfer-one"] = e.target.checked;
          dispatch(
            updateFilter({
              "transfer-all": false,
              filters,
            })
          );
          break;
        case "transfer-two":
          filters["transfer-two"] = e.target.checked;
          dispatch(
            updateFilter({
              "transfer-all": false,
              filters,
            })
          );
          break;
        case "transfer-three":
          filters["transfer-three"] = e.target.checked;
          dispatch(
            updateFilter({
              "transfer-all": false,
              filters,
            })
          );
          break;
        default:
          filters["transfer-none"] = e.target.checked;
          dispatch(
            updateFilter({
              "transfer-all": false,
              filters,
            })
          );
      }
    }
    if (
      filters["transfer-none"] &&
      filters["transfer-one"] &&
      filters["transfer-two"] &&
      filters["transfer-three"] &&
      label !== "transfer-all"
    ) {
      dispatch(
        updateFilter({
          "transfer-all": true,
          filters,
        })
      );
    }
  };
  return (
    <fieldset className={classes.filter}>
      <div className={classes["filter-legend"]}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <label htmlFor="transfer-all" className={classes["filter-option"]}>
        <input
          type="checkbox"
          id="transfer-all"
          name="transfer-all"
          onChange={onPress}
          checked={state["transfer-all"]}
        />
        <span className={classes.check}>Все</span>
      </label>
      <label htmlFor="transfer-none" className={classes["filter-option"]}>
        <input
          type="checkbox"
          id="transfer-none"
          name="transfer-none"
          onChange={onPress}
          checked={state.filters["transfer-none"]}
        />
        <span className={classes.check}>Без пересадок</span>
      </label>
      <label htmlFor="transfer-one" className={classes["filter-option"]}>
        <input
          type="checkbox"
          id="transfer-one"
          name="transfer-one"
          onChange={onPress}
          checked={state.filters["transfer-one"]}
        />
        <span className={classes.check}>1 пересадка</span>
      </label>
      <label htmlFor="transfer-two" className={classes["filter-option"]}>
        <input
          type="checkbox"
          id="transfer-two"
          name="transfer-two"
          onChange={onPress}
          checked={state.filters["transfer-two"]}
        />
        <span className={classes.check}>2 пересадки</span>
      </label>
      <label htmlFor="transfer-three" className={classes["filter-option"]}>
        <input
          type="checkbox"
          id="transfer-three"
          name="transfer-three"
          onChange={onPress}
          checked={state.filters["transfer-three"]}
        />
        <span className={classes.check}>3 пересадки</span>
      </label>
    </fieldset>
  );
};

export default Filter;
