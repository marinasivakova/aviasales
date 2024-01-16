import classes from "./Ticket.module.scss";
import { addMinutes } from "date-fns";

const Ticket = ({ value }) => {

  const getAmountOfStops = (segment) => {
    let string = 'Без пересадок';
    if (segment.stops.length) {
      if (segment.stops.length === 1) {
        string = '1 пересадка';
      } else if (segment.stops.length === 2) {
        string = '2 пересадки';
      } else {
        string = '3 пересадки';
      }
    }
    let result = [segment.stops, string]
    return result;
  }

  const getOriginalTimes = (segment) => {
    let date = new Date(segment.date);
    let duration = addMinutes(date,segment.duration);
    return [ date.toLocaleTimeString([], {
      hour: '2-digit',
      minute:'2-digit'
    }), duration.toLocaleTimeString([], {
      hour: '2-digit',
      minute:'2-digit'
    })]
  }

  const padTo2Digits =(num)=> {
    return num.toString().padStart(2, '0');
  }

  const getTimeString = (segment) =>{
      const minutes = segment.duration % 60;
      const hours = Math.floor(segment.duration / 60);
      return `${padTo2Digits(hours)}ч ${padTo2Digits(minutes)}м`;
    }
  return (
    <div className={classes.ticket}>
      <div className={classes["ticket-header"]}>
        <span className={classes["ticket-price"]}>{value.price.toLocaleString('ru-RU')} P</span>
        <img
          alt="Company logo"
          className={classes["ticket-logo"]}
          src={`//pics.avs.io/99/36/${value.carrier}.png`}
        />
      </div>
      <div className={classes["ticket-row"]}>
        <div className={classes["ticket-cell"]}>
          <div className={classes["ticket-subtitle"]}>{value.segments[0].origin}-{value.segments[0].destination}</div>
          <div className={classes["ticket-subtext"]}>{getOriginalTimes(value.segments[0])[0]}-{getOriginalTimes(value.segments[0])[1]}</div>
        </div>
        <div className={classes["ticket-cell"]}>
          <div className={classes["ticket-subtitle"]}>В ПУТИ</div>
          <div className={classes["ticket-subtext"]}>{getTimeString(value.segments[0])}</div>
        </div>
        <div className={classes["ticket-cell"]}>
          <div className={classes["ticket-subtitle"]}>{getAmountOfStops(value.segments[0])[1]}</div>
          <div className={classes["ticket-subtext"]}>{getAmountOfStops(value.segments[0])[0].toString()}</div>
        </div>
      </div>
      <div className={classes["ticket-row"]}>
        <div className={classes["ticket-cell"]}>
          <div className={classes["ticket-subtitle"]}>{value.segments[1].origin}-{value.segments[1].destination}</div>
          <div className={classes["ticket-subtext"]}>{getOriginalTimes(value.segments[1])[0]}-{getOriginalTimes(value.segments[1])[1]}</div>
        </div>
        <div className={classes["ticket-cell"]}>
          <div className={classes["ticket-subtitle"]}>В ПУТИ</div>
          <div className={classes["ticket-subtext"]}>{getTimeString(value.segments[1])}</div>
        </div>
        <div className={classes["ticket-cell"]}>
          <div className={classes["ticket-subtitle"]}>{getAmountOfStops(value.segments[1])[1]}</div>
          <div className={classes["ticket-subtext"]}>{getAmountOfStops(value.segments[1])[0].toString()}</div>
        </div>
      </div>
    </div>
  );
};
export default Ticket;
