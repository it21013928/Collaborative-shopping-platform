import axios from "axios";
class ToDoService {
  constructor() {}

  request = async (url) => {
    return await axios.get(url);
  };

  getAllProducts() {
    const url = `http://localhost:8002/review/:id`;
    return this.request(url);
  }
}
export default ToDoService;
