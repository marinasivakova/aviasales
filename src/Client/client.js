import axios from "axios";

const Client = async (id) => {
  const url = "https://aviasales-test-api.kata.academy/";
  try {
    const tickets = await axios.get(url + "tickets?searchId=" + id.toString());
    return tickets;
  } catch (err) {
    console.log(err);
  }
};



export default Client;