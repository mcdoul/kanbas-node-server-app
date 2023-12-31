import "dotenv/config";
import express from 'express'
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
// const CONNECTION_STRING = "mongodb+srv://kanbas:kanbas@kanbas.z9fawbv.mongodb.net/kanbas?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,}
    ));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    };
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
    }
      
app.use(
session(sessionOptions)
);
      
app.use(express.json()); //Should be before the route
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
