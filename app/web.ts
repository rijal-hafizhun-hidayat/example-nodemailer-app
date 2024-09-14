import express from "express";
import { apiRoute } from "../router/api";
import { errorMiddleware } from "../middleware/error-middleware";

const web = express();

web.use(express.json());
web.use(apiRoute);
web.use(errorMiddleware);

export { web };
