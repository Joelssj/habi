"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdSensorController = exports.getAllSensorController = exports.createSensorController = exports.getByIdSensorUseCase = exports.getAllUseCase = exports.createSensorUseCase = exports.mysqlSensorRepository = void 0;
const CreateSensorUseCase_1 = require("../application/CreateSensorUseCase");
const GetAllSensorUseCase_1 = require("../application/GetAllSensorUseCase");
const GetByIdSensorUseCase_1 = require("../application/GetByIdSensorUseCase");
const CreateSensorController_1 = require("./controllers/CreateSensorController");
const GetAllSensorController_1 = require("./controllers/GetAllSensorController");
const GetByIdSensorController_1 = require("./controllers/GetByIdSensorController");
const MysqlSensorRepository_1 = require("./MysqlSensorRepository");
exports.mysqlSensorRepository = new MysqlSensorRepository_1.MysqlSensorRepository();
exports.createSensorUseCase = new CreateSensorUseCase_1.CreateSensorUseCase(exports.mysqlSensorRepository);
exports.getAllUseCase = new GetAllSensorUseCase_1.GetAllSensorUseCase(exports.mysqlSensorRepository);
exports.getByIdSensorUseCase = new GetByIdSensorUseCase_1.GetByIdSensorUseCase(exports.mysqlSensorRepository);
exports.createSensorController = new CreateSensorController_1.CreateSensorController(exports.createSensorUseCase);
exports.getAllSensorController = new GetAllSensorController_1.GetAllSensorController(exports.getAllUseCase);
exports.getByIdSensorController = new GetByIdSensorController_1.GetByIdSensorController(exports.getByIdSensorUseCase);
