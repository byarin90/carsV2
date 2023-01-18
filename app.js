import express from "express"
// גישה לנתיב של תיקייה כלשהי
import path from "path"
import { connectToMongoDB } from "./db/mongoConnect.js";
import { routesInit } from "./routes/configRoutes.js";
import { config } from 'dotenv'
config()
connectToMongoDB()
const app = express();
// נותן את הגישה לתגובה של גייסון מהשרת
app.use(express.json());

// server running on port:
const port = process.env.PORT || 3000;

routesInit(app)

app.listen(port, () => {
    console.log(`listening on ${port} `)
})