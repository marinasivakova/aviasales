import { Fragment, useEffect, useState } from "react";
import classes from "./TicketList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { updateButton } from "../../Redux/buttonReducer";
import TicketsSorted from "./TicketsSorted";

const TicketList = ({ buttonData }) => {
  let ticketSelector = useSelector((s) => s.client.tickets);
  let filterSelector = useSelector((s) => s.filter.filters);
  let tabSelector = useSelector((s) => s.tab);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    let ticketsArr = TicketsSorted(
      setIsLoading,
      ticketSelector,
      dispatch,
      updateButton,
      filterSelector,
      tabSelector,
      buttonData,
      classes
    );
    setTickets(ticketsArr);
  }, [ticketSelector, buttonData, dispatch, filterSelector, tabSelector]);

  useEffect(() => {
    if (ticketSelector.length > 7000) {
      setIsLoading(false);
    }
  }, [ticketSelector, buttonData, filterSelector, tabSelector]);

  return (
    <div className={classes["tickets-list"]}>
      {isLoading ? <Loader /> : null}{" "}
      {tickets ? <Fragment>{tickets}</Fragment> : null}
    </div>
  );
};

export default TicketList;
