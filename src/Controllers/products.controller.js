import { ProductsService } from "../Services/Repositories.js";


const getProducts = async(req,res) => {
    const p = req.params.p || 1;
    const result = await ProductsService.getProducts(p);
    if(!result){
        return res.sendServerError("Couldn't get the products");
    }
    return res.sendPayload(null,result);
}

const createProduct = async(req,res) => {
    if(req.user.role=="admin"){
        const data = req.body;
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock || 1,
            category: data.category,
            status: data.status || true
        }
        const exists = await ProductsService.searchProduct({ code: newProduct.code });
        if (exists) {
            const updatedProduct = await ProductsService.updateProduct(exists[0]._id, { stock: (exists[0].stock + newProduct.stock) });
            if(!updatedProduct){
                return res.sendServerError("Couldn't create the product");
            }
            return res.sendPayload("Product stock updated", updatedProduct);
        } else {
            const product = await ProductsService.createProduct(newProduct);
            if (!product) {
                return res.sendServerError("Couldn't create the product");
            }
            return res.sendPayload("Product has been created successfully", product);
        }
    }
    return res.sendUnauthorized();
}

const updateProduct = async(req,res) => {
    if(req.user.role=="admin"){
        const pid = req.params.pid;
        const data = req.body;
        const update = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category,
            status: data.status
        }
        const updatedProduct = await ProductsService.updateProduct(pid, update);
        if (!updatedProduct) {
            return res.sendServerError("Couldn't update the product");
        }
        return res.sendPayload("Product has been updated successfully", updateProduct);
    }
    return res.sendUnauthorized();
}

const deleteProduct = async(req,res) => {
    if(req.user.role=="admin"){
        const pid = req.params.pid;
        const result = await ProductsService.deleteProduct(pid);
        if(!result){
            return res.sendServerError("Couldn't delete product");
        }
        return res.sendPayload("Product has been deleted successfully");
    }
    return res.sendUnauthorized();
}

export default {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct
}