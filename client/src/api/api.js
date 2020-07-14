
import axios from "axios";

export default class API {
  async get(url, data) {
    try {
      const response = await axios.get(url, data);
      return Promise.resolve(response.data);
    }
    catch (error) {
      return await Promise.reject(error);
    }
  }
}
