import BaseRouter from "./BaseRouter.js";
import cartsController from "../Controllers/carts.controller.js";


class CartsRouter extends BaseRouter {
    init(){
        this.get("/:cid",["PUBLIC"],cartsController.getCart);
        this.post("/",["PUBLIC"],cartsController.createCart);
        this.post("/:cid/products/:pid",["PUBLIC"],cartsController.addProduct);
        this.post("/:cid/purchase",["PUBLIC"],cartsController.createTicket);
        this.put("/:cid",["PUBLIC"],cartsController.updateCart);
        this.put("/:cid/products/:pid",["PUBLIC"],cartsController.updateProductQuantity);
        this.delete("/:cid/products/:pid",["PUBLIC"],cartsController.deleteAProduct);
        this.delete("/:cid",["PUBLIC"],cartsController.deleteAllProducts);
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();