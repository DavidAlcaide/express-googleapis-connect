"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectGoogleService = void 0;
const googleapis_1 = require("googleapis");
const connectGoogleService = (serviceName, oAuthClient) => {
    // Recibir el servicio al que se quiere conectar y el cliente OAuth con las credenciales en base al token
    // Devuleve una instancia del servicio al que se quiere conectar
    const services = [{
            serviceName: 'drive',
            initService: function () { return googleapis_1.google.drive({ version: 'v3', auth: oAuthClient }); }
        }, {
            serviceName: 'sheets',
            initService: function () { return googleapis_1.google.sheets({ version: 'v4', auth: oAuthClient }); }
        }];
    return services.filter((x) => { return x.serviceName == serviceName; })[0].initService();
};
exports.connectGoogleService = connectGoogleService;
