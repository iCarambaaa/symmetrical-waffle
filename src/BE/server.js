import express from 'express';
import listEndpoints from "express-list-endpoints";
import authorRouter from "./services/authors/index.js";
import postsRouter from "./services/posts/index.js";
import cors from "cors";
import { genericErrorHandler, badRequestHandler, unauthorizedHandler, notFoundHandler } from "./errorHandlers.js";

const server = express()

server.use(express.json())   // this! specify before ENDPOINTS, else all will be UNDEFINED

server.use("/authors", authorRouter)
server.use("/posts", postsRouter)

const port = 3001

console.table(listEndpoints(server)) // usage of express-list-endpoints



server.listen(port, () => {
    console.log('listening on port:', port)
})

