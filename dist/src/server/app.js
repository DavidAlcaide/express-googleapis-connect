"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const config_1 = __importDefault(require("../../config"));
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const app = express_1.default();
exports.app = app;
config_1.default();
app.use(express_1.default.json());
app.use(api_1.default);
