import axios from "axios";
class ToDoService {
  constructor() {}

  request = async (url) => {
    return await axios.get(url);
  };

  getProducts() {
    const url = `http://localhost:8002/product/`;
    return this.request(url);
  }
}
export default ToDoService;
