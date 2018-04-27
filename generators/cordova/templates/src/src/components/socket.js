import socketio from "socket.io-client";
import config from './config'

export default socketio(config.api.slice(8).indexOf(":") < 0 ? config.api + ":3010" : config.api)