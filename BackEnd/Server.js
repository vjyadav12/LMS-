import { config } from "dotenv";
config()
import app from "./app.js";
import cloudinary from "cloudinary";



const PORT = process.env.PORT || 6767;

cloudinary.v2.config({
    cloud_name: 'duzrhtzpq',
    api_key: '112316263983923',
    api_secret: 'dm2R6Cab_poOBkXkfbH9PQUnSB0',
})

app.listen(PORT,()=>{
    console.log(`server is running on port no. ${PORT}`)
})

