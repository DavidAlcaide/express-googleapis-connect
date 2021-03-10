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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleAuth_1 = require("./../middlewares/googleAuth");
const fs_1 = __importDefault(require("fs"));
const connectGoogle_1 = require("../../lib/connectGoogle");
const router = express_1.default.Router();
router.get('/cz1_tree', googleAuth_1.googleAuth, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const drive = connectGoogle_1.connectGoogleService('sheets', resp.locals.oAuthClient);
    console.log(drive);
    resp.json({ "msg": "Autenticación correcta" });
}));
router.get('/catchToken', (req, resp) => {
    // El get a esta página vendrá unicamente desde la página de generación de token (filtraremos para asegurar esto)
    // Obtenemos el code, generamos el token y redireccionamos a /cz1_tree -> req.query
    let gen_code = req.query.code;
    fs_1.default.writeFileSync('.token.json', gen_code);
    resp.redirect('cz1_tree');
});
exports.default = router;
