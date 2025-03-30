import productService from "../services/productService.js";
class ProductController {
  constructor() {
    this.productService = productService;
  }
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      res.status(201).json({ success: true, ...newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(
        id,
        productData
      );
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProduct(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new ProductController();
