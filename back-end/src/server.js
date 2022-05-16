import express from "express";
import { initializeDbConnection } from "./db";
import routes from "./routes/routeList";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
})

initializeDbConnection().then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server is listening on port ${PORT}`)
    })
})