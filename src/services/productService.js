import { readFile } from "fs/promises";
import { JSONFilePreset } from "lowdb/node";
import { join } from "path";
class ProductService {
  async init() {
    const filePath = join(process.cwd(), "src", "db.json");

    // Read db.json manually
    const jsonData = await readFile(filePath, "utf-8");
    this.defaultData = JSON.parse(jsonData);

    this.db = await JSONFilePreset(filePath, this.defaultData);
    await this.db.read(); // Ensure data is loaded

    // Write only if db.json is empty
    if (!this.db.data || Object.keys(this.db.data).length === 0) {
      this.db.data = this.defaultData;
      await this.db.write();
    }
  }

  async getAllProducts({ page = 1, limit = 10 }) {
    await this.db.read();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const products = this.db.data.products.slice(startIndex, endIndex);
    console.log("Products:", startIndex, endIndex, products);
    return {
      currentPage: page,
      totalPages: Math.ceil(this.db.data.products.length / limit),
      totalProducts: this.db.data.products.length,
      products,
    };
  }

  async getProductById(id) {
    return this.db.data.products.find((product) => product.id === id);
  }

  async createProduct(product) {
    const newProduct = { id: `P${Date.now()}`, ...product };
    this.db.data.products.push(newProduct);
    await this.db.write();
    return newProduct;
  }

  async updateProduct(id, updatedProduct) {
    const product = this.db.data.products.find((p) => p.id === id);
    if (product) Object.assign(product, updatedProduct);
    await this.db.write();
    return product;
  }

  async deleteProduct(id) {
    this.db.data.products = this.db.data.products.filter((p) => p.id !== id);
    await this.db.write();
    return { message: "Product deleted successfully" };
  }

  async getProductsByCategory(category) {
    return this.db.data.products.filter((p) => p.category === category);
  }

  async getProductsByPriceRange(min, max) {
    return this.db.data.products.filter(
      (p) => p.price >= min && p.price <= max
    );
  }

  async getProductsByName(name) {
    return this.db.data.products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async getProductsByBrand(brand) {
    return this.db.data.products.filter((p) => p.brand === brand);
  }

  async getProductsByRating(rating) {
    return this.db.data.products.filter((p) => p.rating >= rating);
  }

  async getProductsByStockStatus(stock_status) {
    return this.db.data.products.filter((p) => p.stock_status === stock_status);
  }
  async getProductBySku(sku) {
    return this.db.data.products.find((p) => p.sku === sku);
  }
}

const productService = new ProductService();
await productService.init();

export default productService;
