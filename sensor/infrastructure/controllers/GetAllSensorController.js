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
exports.GetAllSensorController = void 0;
class GetAllSensorController {
    constructor(getAllSensorUseCase) {
        this.getAllSensorUseCase = getAllSensorUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sensores = yield this.getAllSensorUseCase.run();
                console.log(sensores);
                if (sensores)
                    // Code HTTP: 200 -> Consulta exitosa
                    res.status(200).send({
                        status: "success",
                        data: sensores.map((sensor) => {
                            return {
                                id: sensor.id,
                                temperatura: sensor.temperatura,
                                humedad: sensor.humedad,
                                luz: sensor.luz,
                                comida: sensor.comida,
                                fecha: sensor.fecha,
                                hora: sensor.hora, // Incluye la hora
                            };
                        }),
                    });
                else
                    res.status(400).send({
                        status: "error",
                        msn: "Ocurrió algún problema",
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
exports.GetAllSensorController = GetAllSensorController;
/*import { Request, Response } from "express";

import { GetAllSensorUseCase } from "../../application/GetAllSensorUseCase";

export class GetAllSensorController {
  constructor(readonly getAllSensorUseCase: GetAllSensorUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const sensores = await this.getAllSensorUseCase.run();
      console.log(sensores);
      if (sensores)
        //Code HTTP : 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: sensores.map((sensor: any) => {
            return {
              id: sensor.id,
              pulso_cardiaco: sensor.pulso_cardiaco,
              temperatura: sensor.temperatura,
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
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
