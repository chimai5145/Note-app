import { cleanEnv } from "envalid";
import {port, str } from "envalid/dist/validators";
import "dotenv/config";
//run .env env biến toàn cục 

//Named Imports:
//only want to import specific ones & the names inside must match exactly the names of the exported variables or functions from the module.

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
});