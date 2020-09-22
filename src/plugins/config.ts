let apiUrl = process.env.VUE_APP_SERVER_URL;
let websocketApiUrl = process.env.VUE_APP_SOCKET_URL;
const mqttBrokerUrl = process.env.VUE_APP_MQTT_URL;

apiUrl = '/api';
const socketPath = process.env.NODE_ENV === 'production' ? '/socket/socket.io/' : '/socket.io/';

if (process.env.NODE_ENV === 'production') {
  const serverUrl = 'DOCKER_VUE_APP_SERVER_URL';
  const version = 'DOCKER_VUE_APP_API_VERSION';
  apiUrl = 'http://' + serverUrl + apiUrl + '/' + version;
  websocketApiUrl = 'DOCKER_VUE_APP_SOCKET_URL';
}
export { websocketApiUrl, apiUrl, socketPath, mqttBrokerUrl };
