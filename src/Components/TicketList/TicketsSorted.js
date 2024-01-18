import { v4 as uuidv4 } from "uuid";
import Ticket from "../Ticket";
import React from "react";

export default function TicketsSorted(
  setIsLoading,
  ticketSelector,
  dispatch,
  updateButton,
  filterSelector,
  tabSelector,
  buttonData,
  classes
) {
  setIsLoading(true);
  let sortedArr = [];
  if (ticketSelector.length !== 0) {
    dispatch(updateButton({ button: true }));
    sortedArr = ticketSelector
      .filter((element) => {
        if (filterSelector["transfer-none"]) {
          return (
            element.segments[0].stops.length +
              element.segments[1].stops.length ===
            0
          );
        }
        if (filterSelector["transfer-one"]) {
          return (
            element.segments[0].stops.length +
              element.segments[1].stops.length ===
            1
          );
        }
        if (filterSelector["transfer-two"]) {
          return (
            element.segments[0].stops.length +
              element.segments[1].stops.length ===
            2
          );
        }
        if (filterSelector["transfer-three"]) {
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
        if (tabSelector.cheap) {
          return a.price - b.price;
        } else if (tabSelector.fast) {
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
        return <Ticket value={element} key={uuidv4()} />;
      });
    if (sortedArr.length === 0) {
      dispatch(updateButton({ button: false }));
      sortedArr = (
        <div className={classes["message-container"]}>
          <h2 className={classes["message"]}>
            Рейсов, подходящих под заданные фильтры, не найдено
          </h2>
        </div>
      );
    }
    return sortedArr;
  }
}
