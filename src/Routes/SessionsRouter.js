import { passportCall } from "../Middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import usersController from "..//Controllers/users.controller.js";


class SessionsRouter extends BaseRouter {
    init(){
        this.post("/register",["PUBLIC"],passportCall("register"),usersController.registerUser);
        this.post("/login",["PUBLIC"],passportCall("login"),usersController.loginUser)
        this.get("/current",["PUBLIC"],usersController.current)
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();