import app from "./app";//chay tu tren xuong duoi that :)))
import env from "./util/validateEnv";
import mongoose from "mongoose";

//retrieve port number
const port = env.PORT;

// connecting to mongo 
mongoose.connect(env.MONGO_CONNECTION_STRING)
    //handling success connection
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server's running on port: " + port);
        });
    //handling fail connection
    }).catch(console.error);



