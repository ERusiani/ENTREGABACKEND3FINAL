import cartsModel from "../Models/cart.model.js";
export default class CartsDao {

    create(cart) {
        return cartsModel.create(cart);
    }
    getById(id) {
        return cartsModel.findById(id).populate("products.product");
    }
    update(id, data) {
        return cartsModel.updateOne({_id:id}, data);
    }

}