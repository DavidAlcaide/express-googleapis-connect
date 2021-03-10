import express, { Request, Response, Router } from 'express'
import { googleAuth } from './../middlewares/googleAuth'
import fs from 'fs'
import { connectGoogleService } from '../../lib/connectGoogle'

const router: Router = express.Router()

router.get('/cz1_tree', googleAuth, async (req: Request, resp: Response): Promise<any> =>{
    const drive = connectGoogleService('sheets', resp.locals.oAuthClient)
    console.log(drive)
    resp.json({"msg":"Autenticación correcta"})
})

router.get('/catchToken', (req:Request, resp:Response):void=>{
    // El get a esta página vendrá unicamente desde la página de generación de token (filtraremos para asegurar esto)
    // Obtenemos el code, generamos el token y redireccionamos a /cz1_tree -> req.query
    let gen_code: any = req.query.code
    fs.writeFileSync('.token.json', gen_code)
    resp.redirect('cz1_tree')
})


export default router

