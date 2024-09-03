import productsModel from "../Models/product.model.js";
export default class ProductsDao {

    get(p) {
        return productsModel.paginate({}, { page: p, limit: 10 });
    }
    create(product) {
        return productsModel.create(product);
    }
    getOne(params){
        return productsModel.find(params);
    }
    getById(params) {
        return productsModel.findOne(params);
    }
    update(id,data) {
        return productsModel.updateOne({_id:id}, data);
    }
    delete(id) {
        return productsModel.deleteOne({_id:id});
    }
}