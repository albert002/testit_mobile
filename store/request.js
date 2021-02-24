import { AsyncStorage } from 'react-native';

class Request {
  constructor() {
    this.main = `http://159.65.101.202`;
    this.port = `:8787`;
  }
  get = url => this.sendRequest('GET', url, null, null);

  post = (url, data) => this.sendRequest('POST', url, data, null);

  postJson = (url, data) => this.sendRequest('POST', url, JSON.stringify(data), 'application/json');

  put = (url, data, type = null) => this.sendRequest('PUT', url, JSON.stringify(data), 'application/json');

  putFormData = (url, data, type = null) => this.sendRequest('PUT', url, data, null);

  delete = (url, data) => this.sendRequest('DELETE', url, JSON.stringify(data), 'application/json');

  sendRequest = async (method, url, body, contentType) => {
    console.log('****************************** REQUEST ************************');
    const token = await AsyncStorage.getItem('token');
    this.url = this.main + this.port;
    let headers = {};
    contentType
      ? (headers = {
          'Content-Type': contentType,
          Authorization: 'Bearer ' + token,
        })
      : (headers = {
          Authorization: 'Bearer ' + token,
        });
    return fetch(this.url + url, { method, headers, body });
  };
}

export default new Request();
