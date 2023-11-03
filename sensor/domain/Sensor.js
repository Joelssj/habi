"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sensor = void 0;
class Sensor {
    constructor(id, temperatura, humedad, luz, comida, fecha, hora) {
        this.id = id;
        this.temperatura = temperatura;
        this.humedad = humedad;
        this.luz = luz;
        this.comida = comida;
        this.fecha = fecha;
        this.hora = hora;
    }
}
exports.Sensor = Sensor;

