import axios from "axios";
class ToDoService {
  constructor() {}

  request = async (url) => {
    return await axios.get(url);
  };

  getAllProducts() {
    const url = `http://localhost:8000/product/`;
    return this.request(url);
  }

  getProduct() {
    const url = `http://localhost:8000/product/:id`;
    return this.request(url);
  }

  getProductBySeller(id) {
    const url = `http://localhost:8000/product/productBySeller/${id}`;
    return this.request(url);
  }
}

export default ToDoService;
