export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getTicketById(id) {
        return this.dao.getOne({ _id: id });
    }
    getTicketByCode(code) {
        return this.dao.getOne({ code: code });
    }
    getTicketByEmail(email) {
        return this.dao.getOne({ purchaser : email });
    }
    createTicket(ticket) {
        return this.dao.create(ticket);
    }
};