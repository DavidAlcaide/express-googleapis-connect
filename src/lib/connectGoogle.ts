import {google, GoogleApis} from 'googleapis'
import { IGoogleService } from '../interfaces'

const connectGoogleService = (serviceName:string, oAuthClient:any):any=>{
    
    // Recibir el servicio al que se quiere conectar y el cliente OAuth con las credenciales en base al token
    // Devuleve una instancia del servicio al que se quiere conectar
    const services: Array<IGoogleService> = [{
        serviceName: 'drive',
        initService: function(){return google.drive({version: 'v3', auth: oAuthClient})}
    },{
        serviceName: 'sheets',
        initService: function(){return google.sheets({version: 'v4', auth: oAuthClient})}
    }]

    return services.filter((x)=>{return x.serviceName == serviceName})[0].initService()

}


export {connectGoogleService }