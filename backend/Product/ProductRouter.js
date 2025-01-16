import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "./ProductController.js";
import { uploadimg } from "../multer.js";

const ProductRouter = express.Router();

ProductRouter.get("/Product/get", getProducts);
ProductRouter.post(
  "/Product/create",
  (req, res, next) => {
    uploadimg(req, res, (err) => {
      next();
    });
  },
  createProduct
);
ProductRouter.put("/Product/update/:id", updateProduct);
ProductRouter.delete("/Product/delete/:id", deleteProduct);
ProductRouter.get("/Product/get/:id", getProductById);

export default ProductRouter;
