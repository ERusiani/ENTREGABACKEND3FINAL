export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUser(id) {
        return this.dao.getOne({ _id: id });
    }
    getUserByEmail(email) {
        return this.dao.getOne({ email: email })
    }
    createUser(user) {
        return this.dao.create(user);
    }
};