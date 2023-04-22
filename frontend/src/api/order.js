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
  getSingleOrder(orderID) {
    const url = `http://localhost:8000/orders/getorderbyorderid/${orderID}`;
    return this.request(url);
  }
  getOrderProducts(orderID) {
    const url = `http://localhost:8000/orders/orderProduct/view/${orderID}`;
    return this.request(url);
  }
}
export default ToDoService;
