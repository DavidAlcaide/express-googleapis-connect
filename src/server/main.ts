import { app } from './app'

app.listen(process.env.PORT, ():void=>{
    console.log(`Server listening on PORT ${process.env.PORT}`)
})