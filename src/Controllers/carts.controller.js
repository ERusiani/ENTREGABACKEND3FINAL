import { CartsService, UsersService, ProductsService, TicketsService } from "../Services/Repositories.js";

const createCart = async(req, res) => {
    const cart = {
        products: []
    };
    const result = await CartsService.createCart(cart);
    if (!result) {
        return res.sendServerError();
    }
    res.sendPayload("Cart has been created", result);
}

const addProduct = async(req, res) => {
    if(req.user.cart==req.params.cid){
        const {cid,pid} = req.params;
        const qty = req.body.quantity || 1;
        const cart = await CartsService.getCart(cid);
        if (!cart) {
            return res.sendBadRequest("Cart don't exist");
        }
        const product = await ProductsService.getProductById(pid);
        if (!product) {
            return res.sendBadRequest("Product don't exist");
        }
        let exists = false;
        cart.products.forEach(eachproduct => {
            if (eachproduct.product._id == pid) {
                eachproduct.quantity += qty;
                exists = true;
            }
        });
        if (!exists) {
            cart.products.push({ product: product._id, quantity: qty });
            const result = await CartsService.updateCart(cid, { products: cart.products });
            if (!result) {
                return res.sendServerError("Couldn't add product to the cart");
            }
            return res.sendPayload("Product added successfully", result);
        } else {
            const result = await CartsService.updateCart(cid, { $set: { products: cart.products } });
            if (!result) {
                return res.sendServerError("Couldn't add product to the cart");
            } else {
                return res.sendPayload("Product stock has been incremented successfully", result);
            }
        }
    }
    return res.sendUnauthorized();
}

const getCart = async(req,res) => {
    if(req.user.cart==req.params.cid){
        const cid  = req.params.cid;
        const result = await CartsService.getCart(cid);        
        if (!result) {
            return res.sendServerError("Couldn't find the cart");
        }
        return res.sendPayload(null,result);
    }
    return res.sendUnauthorized();
}

const updateCart = async(req,res) => {
    if(req.user.cart==req.params.cid){
        const cid  = req.params.cid;
        const result = await CartsService.updateCart(cid, { products: data });
        if (!result) {
            return res.sendServerError("Couldn't find the cart");
        }
        return res.sendPayload("Cart has been updated successfully", result);
    }
    return res.sendUnauthorized();
}

const updateProductQuantity = async(req,res) => {
    if(req.user.cart==req.params.cid){
        const {cid, pid, qty}  = req.params;
        const cart = await CartsService.getCart(cid);
        if (!cart) {
            return res.sendServerError("Couldn't find cart");
        }
        const product = await ProductsService.getProductById(pid);
        if (!product) {
            return res.sendBadRequest("Product don't exist");
        }
        cart.products.forEach(eachproduct => {
            if (eachproduct.product._id == pid) {
                eachproduct.quantity = qty;
            }
        });
        const result = await CartsService.updateCart(cid, cart);
        if (!result) {
            return res.sendServerError("Couldn't update the cart");
        }
        return res.sendPayload("Cart has been updated successfully", result);
    }
    return res.sendUnauthorized();
}

const deleteAProduct = async(req,res) => {
    if(req.user.cart==req.params.cid){
        const {cid, pid}  = req.params;
        const cart = await CartsService.getCart(cid);
        if (!cart) {
            return res.sendServerError("Couldn't find cart");
        }
        const product = await ProductsService.getProductById(pid);
        if (!product) {
            return res.sendBadRequest("Product doesn't exist");
        }
        for (let i = cart.products.length - 1; i >= 0; i--) {
            if (cart.products[i].product._id == pid) {
                cart.products.splice(i, 1);
            }
        }
        const result = await CartsService.updateCart(cid, cart);
        if (!result) {
            return res.sendServerError("Couldn't delete product from the cart");
        }
        return res.sendPayload("Product has been deleted from the cart", result);
    }
    return res.sendUnauthorized();
}

const deleteAllProducts = async(req,res) => {
    if(req.user.cart==req.params.cid){
        const cid  = req.params.cid;
        const cart = await CartsService.getCart(cid);
        if (!cart) {
            return res.sendServerError("Couldn't find the cart");
        }
        const result = await CartsService.updateCart(cid, { $set: { products: [] } });
        if (!result) {
            return res.sendServerError("Couldn't delete products");
        }
        return res.sendPayload("All products has been deleted from the cart", result);
    }
    return res.sendUnauthorized();
}

const createTicket = async(req, res) => {
    const cid = req.params.cid;
    if(req.user.cart == cid){
        const cart = await CartsService.getCart(cid);        
        if (!cart) {
            return res.sendServerError("Couldn't find the cart");
        }
        const user = await UsersService.getUser(req.user.id);
        if(!user){
            return res.sendServerError("Couldn't find user");
        }

        const itemList = [];
        let amount = 0;
        const missingItems = cart.products.map((product)=>{
            if(product.quantity>product.product.stock){
                return product.product.title;
            }
            itemList.push({id:product.product._id, stock:product.quantity, price:product.product.price});
            amount+=product.product.price*product.quantity;
        }).filter(item => item != null);
    
        if(missingItems.length){
            return res.sendPayload("There's not enough stock for the specified items:", missingItems);
        }else{
            const ticket = {
                amount:amount,
                purchaser:user.email
            }
            const ticketResult = await TicketsService.createTicket(ticket);
            if(!ticketResult){
                res.sendServerError("Couldn't create the ticket");
            }
            itemList.forEach(async(eachproduct)=>{
                const product = await ProductsService.getProductById(eachproduct.id);
                const productResult = await ProductsService.updateProduct(eachproduct.id, {stock:product.stock-=eachproduct.stock});
                if(!productResult){
                    res.sendServerError("Couldn't create the ticket");
                }
            });
            const cartResult = await CartsService.updateCart(cid, { $set: { products: [] } });
            if(!cartResult){
                res.sendServerError("Couldn't create the ticket");
            }
            return res.sendPayload("The items have been processed correctly.", ticketResult);
        }
    }
    return res.sendUnauthorized();
}


export default {
    addProduct,
    createCart,
    createTicket,
    deleteAllProducts,
    deleteAProduct,
    getCart,
    updateCart,
    updateProductQuantity
}