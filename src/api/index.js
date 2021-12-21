import axios from 'axios';

// var BASE_URL = `http://192.168.0.3:8080/api/v1/`;
var BASE_URL = 'https://seedschool.herokuapp.com/api/v1/';
// var BASE_URL = `http://192.168.50.23:8080/api/v1/`;
var token = window.localStorage.getItem("token");
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Access-Control-Allow-Methods"] = 'DELETE, POST, GET, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, X-Request-With';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const HTTP = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Authorization': `${token}`,
    // "Access-Control-Allow-Origin":'*',
    // "Access-Control-Allow-Methods":'DELETE, POST, GET, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Content-Type': 'application/json'
}
})