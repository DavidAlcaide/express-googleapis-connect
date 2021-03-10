import {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import {google} from 'googleapis'
import { ICredentials } from '../../interfaces'

const TOKEN_PATH: string = 'token.json'
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const googleAuth = async (req:Request, resp:Response, next:NextFunction):Promise<void>=>{
    // Leer el token desde el TOKEN_PATH y si no está disponible, se crea.
    let data: ICredentials = JSON.parse(fs.readFileSync('credenciales.json').toString())
    const oAuthClient = new google.auth.OAuth2(data.web.client_id, data.web.client_secret, data.web.redirect_uris[0])
    try{
        let token: Object= JSON.parse(fs.readFileSync(TOKEN_PATH).toString())
        oAuthClient.setCredentials(token)
        resp.locals.oAuthClient = oAuthClient
        next()
    }catch(err){
        try{
            let tokenCode: string = fs.readFileSync('.token.json').toString()
            oAuthClient.getToken(tokenCode, (err, token:any)=>{
                if(err) return console.log(`Error retrieving access token: ${err.message}`)
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
                oAuthClient.setCredentials(token)
                resp.locals.oAuthClient = oAuthClient
                next()
            })
        }catch(err){
            let aUthUrl: string = oAuthClient.generateAuthUrl({
                access_type: 'offline', 
                scope: SCOPES
            })
            resp.redirect(aUthUrl)
        }
    }
}


export {googleAuth}
