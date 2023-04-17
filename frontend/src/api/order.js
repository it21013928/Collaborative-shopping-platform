import axios from "axios";

class ToDoService {
  constructor() {}

  request = async (url) => {
    return await axios.get(url);
  };

  getAllOrders() {
    const url = `http://localhost:8000/orders/`;
    return this.request(url);
  }
  getPaidOrders() {
    const url = `http://localhost:8000/orders/paidOrders`;
    return this.request(url);
  }
}
export default ToDoService;
