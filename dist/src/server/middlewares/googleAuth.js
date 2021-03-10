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
exports.googleAuth = void 0;
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const TOKEN_PATH = 'token.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const googleAuth = (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Leer el token desde el TOKEN_PATH y si no está disponible, se crea.
    let data = JSON.parse(fs_1.default.readFileSync('credenciales.json').toString());
    const oAuthClient = new googleapis_1.google.auth.OAuth2(data.web.client_id, data.web.client_secret, data.web.redirect_uris[0]);
    try {
        let token = JSON.parse(fs_1.default.readFileSync(TOKEN_PATH).toString());
        oAuthClient.setCredentials(token);
        resp.locals.oAuthClient = oAuthClient;
        next();
    }
    catch (err) {
        try {
            let tokenCode = fs_1.default.readFileSync('.token.json').toString();
            oAuthClient.getToken(tokenCode, (err, token) => {
                if (err)
                    return console.log(`Error retrieving access token: ${err.message}`);
                fs_1.default.writeFileSync(TOKEN_PATH, JSON.stringify(token));
                oAuthClient.setCredentials(token);
                resp.locals.oAuthClient = oAuthClient;
                next();
            });
        }
        catch (err) {
            let aUthUrl = oAuthClient.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });
            resp.redirect(aUthUrl);
        }
    }
});
exports.googleAuth = googleAuth;
