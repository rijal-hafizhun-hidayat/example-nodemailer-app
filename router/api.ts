import express from "express";
import { UserController } from "../controller/user-controller";
import { AuthController } from "../controller/auth-controller";

const apiRoute = express.Router();

apiRoute.post("/api/user", UserController.store);
apiRoute.post("/api/reset-password", AuthController.resetPassword);

export { apiRoute };
