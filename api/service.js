// Archivo de conexión al backend
//

import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URI,
      withCredentials: true
    });
  }



}


const axiosRequestFunctions = new Service();

export default axiosRequestFunctions;