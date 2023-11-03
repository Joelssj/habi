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
exports.MysqlSensorRepository = void 0;
const mysql_1 = require("../../database/mysql");
const Sensor_1 = require("../domain/Sensor");
class MysqlSensorRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM sensor";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataSensores = Object.values(JSON.parse(JSON.stringify(data)));
                return dataSensores.map((sensor) => new Sensor_1.Sensor(sensor.id, sensor.temperatura, // Modifica el nombre del atributo a temperatura
                sensor.humedad, // Incluye la humedad
                sensor.luz, // Incluye la luz
                sensor.comida, // Incluye la comida
                sensor.fecha, // Incluye la fecha
                sensor.hora // Incluye la hora
                ));
            }
            catch (error) {
                return null;
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM sensor WHERE id=?";
            const params = [userId];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
                // estar dentro de un bloque try/catch, si hay error se captura en el catch
                return new Sensor_1.Sensor(result[0].id, result[0].temperatura, // Modifica el nombre del atributo a temperatura
                result[0].humedad, // Incluye la humedad
                result[0].luz, // Incluye la luz
                result[0].comida, // Incluye la comida
                result[0].fecha, // Incluye la fecha
                result[0].hora // Incluye la hora
                );
            }
            catch (error) {
                return null;
            }
        });
    }
    createSensor(temperatura, // Modifica el nombre del atributo a temperatura
    humedad, // Incluye la humedad
    luz, // Incluye la luz
    comida, // Incluye la comida
    fecha, // Incluye la fecha
    hora // Incluye la hora
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO sensor (temperatura, humedad, luz, comida, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)";
            const params = [temperatura, humedad, luz, comida, fecha, hora];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
                // estar dentro de un bloque try/catch, si hay error se captura en el catch
                return new Sensor_1.Sensor(result.insertId, temperatura, humedad, luz, comida, fecha, hora);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlSensorRepository = MysqlSensorRepository;
/*import { query } from "../../database/mysql";
import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class MysqlSensorRepository implements SensorRepository {
  async getAll(): Promise<Sensor[] | null> {
    const sql = "SELECT * FROM sensor";
    try {
      const [data]: any = await query(sql, []);
      const dataSensores = Object.values(JSON.parse(JSON.stringify(data)));

      return dataSensores.map(
        (sensor: any) =>
          new Sensor(
            sensor.id,
            sensor.pulso_cardiaco,
            sensor.temperatura
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<Sensor | null> {
    const sql = "SELECT * FROM sensor WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
/* return new Sensor(
   result[0].id,
   result[0].pulso_cardiaco,
   result[0].temperatura
 );
} catch (error) {
 return null;
}
}

async createSensor(
pulso_cardiaco: number,
temperatura: number
): Promise<Sensor | null> {
const sql =
 "INSERT INTO sensor (pulso_cardiaco, temperatura) VALUES (?, ?)";
const params: any[] = [pulso_cardiaco, temperatura];
try {
 const [result]: any = await query(sql, params);
 //El objeto Result es un objeto que contiene info generada de la bd
 /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
       estar dentro de un bloque try/catch si hay error se captura en el catch */
/*  return new Sensor(result.insertId,pulso_cardiaco, temperatura);
} catch (error) {
  return null;
}
}
}*/
