import { Fragment, useCallback, useEffect, useState } from "react";
import Ticket from "../Ticket";
import classes from "./TicketList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { updateButton } from "../../Redux/buttonReducer";

const TicketList = ({ buttonData }) => {
  let r = useSelector((s) => s.client.tickets);
  let filter = useSelector((s) => s.filter.filters);
  let tab = useSelector((s) => s.tab);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const sortTickets = useCallback(() => {
    let arr = [];
    setIsLoading(true);
    if (r.length !== 0) {
      dispatch(updateButton({button: true}));
      arr = r
        .filter((element) => {
          if (filter["transfer-none"]) {
            return (
              element.segments[0].stops.length +
                element.segments[1].stops.length ===
              0
            );
          }
          if (filter["transfer-one"]) {
            return (
              element.segments[0].stops.length +
                element.segments[1].stops.length ===
              1
            );
          }
          if (filter["transfer-two"]) {
            return (
              element.segments[0].stops.length +
                element.segments[1].stops.length ===
              2
            );
          }
          if (filter["transfer-three"]) {
            return (
              element.segments[0].stops.length +
                element.segments[1].stops.length ===
              3
            );
          } else {
            return null;
          }
        })
        .sort((a, b) => {
          if (tab.cheap) {
            return a.price - b.price;
          } else if (tab.fast) {
            return (
              a.segments[0].duration +
              a.segments[1].duration -
              (b.segments[0].duration + b.segments[1].duration)
            );
          }
          return (
            a.segments[0].stops.length +
            a.segments[1].stops.length -
            (b.segments[0].stops.length + b.segments[1].stops.length)
          );
        })
        .map((element, index) => {
          if (index >= buttonData * 5) {
            return null;
          }
          return <Ticket value={element} key={index} />;
        });
      if (arr.length === 0) {
        dispatch(updateButton({button: false}));
        arr = <div className={classes['message-container']}><h2 className={classes['message']}>Рейсов, подходящих под заданные фильтры, не найдено</h2></div>;
      }
      return arr;
    }
  }, [r, buttonData, filter, tab, dispatch]);
  useEffect(() => {
    let ticketsArr = sortTickets();
    setTickets(ticketsArr);
  }, [r, sortTickets]);

  useEffect(() => {
      if (r.length > 7000) {
        setIsLoading(false);
      }
  }, [r, buttonData, filter, tab]);

  return (
    <div className={classes["tickets-list"]}>
      {isLoading ? <Loader /> : null} {tickets ? <Fragment>{tickets}</Fragment> : null}
    </div>
  );
};

export default TicketList;
