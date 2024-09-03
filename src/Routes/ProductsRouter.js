import BaseRouter from "./BaseRouter.js";
import productsController from "../Controllers/products.controller.js";


class ProductsRouter extends BaseRouter {
    init(){
        this.get("/:p",["PUBLIC"],productsController.getProducts);
        this.post("/",["AUTHORIZED"],productsController.createProduct);
        this.put("/:pid",["AUTHORIZED"],productsController.updateProduct);
        this.delete("/:pid",["AUTHORIZED"],productsController.deleteProduct);
    }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();