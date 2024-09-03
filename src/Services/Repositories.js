import CartsDao from "../DB/DAO/CartsDAO.js";
import ProductsDao from "../DB/DAO/ProductsDAO.js";
import TicketsDao from "../DB/DAO/TicketsDAO.js";
import UsersDao from "../DB/DAO/UsersDAO.js";

import CartsRepository from "../Repositories/CartsRepository.js";
import ProductsRepository from "../Repositories/ProductsRepository.js";
import TicketsRepository from "../Repositories/TicketsRepository.js";
import UsersRepository from "../Repositories/UsersRepository.js";

export const UsersService = new UsersRepository(new UsersDao());
export const CartsService = new CartsRepository(new CartsDao());
export const ProductsService = new ProductsRepository(new ProductsDao());
export const TicketsService = new TicketsRepository(new TicketsDao());