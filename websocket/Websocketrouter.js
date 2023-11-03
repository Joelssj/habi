"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebSockets = void 0;
const MysqlSensorRepository_1 = require("../sensor/infrastructure/MysqlSensorRepository");
// Mantener una lista de sockets (clientes) conectados
const connectedClients = new Set();
const sensorRepository = new MysqlSensorRepository_1.MysqlSensorRepository();
function handleWebSockets(io) {
    io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
        console.log("Un usuario conectado!");
        // Agregar el socket (cliente) a la lista de clientes conectados
        connectedClients.add(socket);
        // Emitir todos los datos al cliente cuando se conecte
        yield emitAllDataToClients();
        // Escucha el evento "disconnect" del cliente
        socket.on("disconnect", () => {
            console.log("Un usuario se desconecto!");
            // Remover el socket (cliente) de la lista de clientes conectados
            connectedClients.delete(socket);
        });
    }));
    // Llamar a la función emitAllDataToClients cada 5 segundos
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        yield emitAllDataToClients();
    }), 5000);
}
exports.handleWebSockets = handleWebSockets;
// Función para obtener y emitir todos los datos actualizados a todos los clientes conectados
function emitAllDataToClients() {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener todos los datos de la base de datos
        const allSensorData = yield sensorRepository.getAll();
        // Envía todos los datos al cliente cuando se conecte
        if (allSensorData) {
            const jsonData = JSON.stringify(allSensorData);
            for (const clientSocket of connectedClients) {
                clientSocket.emit("sen_data", jsonData);
            }
        }
    });
}
