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
exports.CreateSensorController = void 0;
class CreateSensorController {
    constructor(createSensorUseCase) {
        this.createSensorUseCase = createSensorUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log("mensaje " + JSON.stringify(data));
            try {
                const sensor = yield this.createSensorUseCase.run(data.temperatura, // Modifica el nombre del atributo a temperatura
                data.humedad, // Agrega la humedad
                data.luz, // Agrega la luz
                data.comida, // Agrega la comida
                new Date(data.fecha), // Convierte la fecha a un objeto Date
                data.hora // Agrega la hora
                );
                if (sensor)
                    // Code HTTP: 201 -> Creado
                    res.status(201).send({
                        status: "success",
                        data: {
                            id: sensor === null || sensor === void 0 ? void 0 : sensor.id,
                            temperatura: sensor === null || sensor === void 0 ? void 0 : sensor.temperatura,
                            humedad: sensor === null || sensor === void 0 ? void 0 : sensor.humedad,
                            luz: sensor === null || sensor === void 0 ? void 0 : sensor.luz,
                            comida: sensor === null || sensor === void 0 ? void 0 : sensor.comida,
                            fecha: sensor === null || sensor === void 0 ? void 0 : sensor.fecha,
                            hora: sensor === null || sensor === void 0 ? void 0 : sensor.hora, // Incluye la hora
                        },
                    });
                else
                    res.status(204).send({
                        status: "error",
                        data: "NO fue posible agregar el registro",
                    });
            }
            catch (error) {
                // Code HTTP: 204 Sin contenido
                res.status(204).send({
                    status: "error",
                    data: "Ocurrió un error",
                    msn: error,
                });
            }
        });
    }
}
exports.CreateSensorController = CreateSensorController;
/*import { Request, Response } from "express";

import { CreateSensorUseCase } from "../../application/CreateSensorUseCase";


export class CreateSensorController {
  constructor(readonly createSensorUseCase: CreateSensorUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log("mensaje " + JSON.stringify(data));
    try {
      const sensor = await this.createSensorUseCase.run(
        data.pulso_cardiaco,
        data.temperatura
      );

      if (sensor)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: sensor?.id,
            pulso_cardiaco: sensor?.pulso_cardiaco,
            temperatura: sensor?.temperatura,
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}*/
