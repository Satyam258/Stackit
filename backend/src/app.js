import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js"; 

const app = express();
app.use(express.json());
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}))
app.use(express.json());

app.use( cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }))

  app.use("/api/auth", authRoutes);

export {app};