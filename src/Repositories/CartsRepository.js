export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCart(id) {
        return this.dao.getById(id);
    }
    createCart(cart) {
        return this.dao.create(cart);
    }
    updateCart(id, data) {
        return this.dao.update(id, data);
    }
};