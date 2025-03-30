import productService from "../services/productService.js";
import productSchema from "../validations/product.js";

class ProductController {
  constructor() {
    this.productService = productService;
  }
  async getAllProducts(req, res) {
    try {
      const { page = 1, per_page = 10 } = req.query;
      const currentPage = parseInt(page, 10);
      const perPage = parseInt(per_page, 10);

      const { products, totalProducts, totalPages } =
        await productService.getAllProducts({
          page: currentPage,
          limit: perPage,
        });

      const links = {
        self: `/api/v1/products?page=${currentPage}`,
        next:
          currentPage < totalPages
            ? `/api/v1/products?page=${currentPage + 1}`
            : null,
        prev:
          currentPage > 1 ? `/api/v1/products?page=${currentPage - 1}` : null,
      };

      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        products,
        pagination: {
          current_page: currentPage,
          per_page: perPage,
          total_pages: totalPages,
          total_products: totalProducts,
        },
        links,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          details: "No product was found with the given ID.",
        });
      }
      res.status(200).json({
        success: true,
        product,
        message: "Product details retrieved successfully.",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
      const { error } = productSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      const productData = req.body;

      // Check if a product with the same SKU already exists
      const existingProduct = await productService.getProductBySku(
        productData.sku
      );
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: "A product with the same SKU already exists.",
        });
      }

      const timestamp = new Date().toISOString();
      const newProduct = await productService.createProduct({
        ...productData,
        stock_status: productData.stock_status || "in_stock",
        id: `PD-${Date.now()}`,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      res.status(201).json({
        success: true,
        ...newProduct,
        message: "Product entry created successfully.",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const timestamp = new Date().toISOString();
      const updatedProduct = await productService.updateProduct(id, {
        ...productData,
        updatedAt: timestamp,
      });
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
