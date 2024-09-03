import usersModel from "../Models/user.model.js";
export default class UsersDao {

    get() {
        return usersModel.find({});
    }
    create(user) {
        return usersModel.create(user);
    }
    getOne(params) {
        return usersModel.findOne(params);
    }
}