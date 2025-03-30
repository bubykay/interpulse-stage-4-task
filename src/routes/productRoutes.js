import { Router } from "express";
import productController from "../controllers/productController.js";
const router = Router();
/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Returns a list of all products.
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Products retrieved successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       description:
 *                         type: string
 *                       sku:
 *                         type: string
 *                       stock_status:
 *                         type: string
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     total_pages:
 *                       type: integer
 *                     total_products:
 *                       type: integer
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                     next:
 *                       type: string
 *                       nullable: true
 *                     prev:
 *                       type: string
 *                       nullable: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 headers:
 *                   type: object
 *                   properties:
 *                     X-RateLimit-Limit:
 *                       type: string
 *                     X-RateLimit-Remaining:
 *                       type: string
 *                     X-RateLimit-Reset:
 *                       type: string
 */
router.get("/", (req, res) => productController.getAllProducts(req, res));
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Returns a single product by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product details retrieved successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: Product 1
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                     description:
 *                       type: string
 *                       example: Description for Product 1
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 headers:
 *                   type: object
 *                   properties:
 *                     X-RateLimit-Limit:
 *                       type: string
 *                       example: "100"
 *                     X-RateLimit-Remaining:
 *                       type: string
 *                       example: "90"
 *                     X-RateLimit-Reset:
 *                       type: string
 *                       example: "1743362777"
 */
router.get("/:id", (req, res) => productController.getProductById(req, res));
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Sample Product"
 *               category:
 *                 type: string
 *                 enum: ["Electronics", "Clothing", "Books", "Home", "Toys"]
 *                 example: "Electronics"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 19.99
 *               stock_status:
 *                 type: string
 *                 enum: ["in_stock", "out_of_stock"]
 *                 default: "in_stock"
 *                 example: "in_stock"
 *               sku:
 *                 type: string
 *                 pattern: "^[a-zA-Z0-9]{3,20}$"
 *                 example: "ABC123"
 *               description:
 *                 type: string
 *                 maxLength: 50
 *                 example: "A short description of the product."
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product entry created successfully.
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 id:
 *                   type: string
 *                   example: PD-1743359388386
 *                 name:
 *                   type: string
 *                   example: Product adfad
 *                 price:
 *                   type: number
 *                   example: 10.99
 *                 description:
 *                   type: string
 *                   example: Description for Product 1
 *                 sku:
 *                   type: string
 *                   example: surprise1
 *                 stock_status:
 *                   type: string
 *                   example: in_stock
 *                 category:
 *                   type: string
 *                   example: Clothing
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-30T18:29:48.386Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-03-30T18:29:48.386Z
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 headers:
 *                   type: object
 *                   properties:
 *                     X-RateLimit-Limit:
 *                       type: string
 *                       example: "100"
 *                     X-RateLimit-Remaining:
 *                       type: string
 *                       example: "92"
 *                     X-RateLimit-Reset:
 *                       type: string
 *                       example: "1743362945"
 */
router.post("/", (req, res) => productController.createProduct(req, res));
/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Updates an existing product by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "Updated Product"
 *               category:
 *                 type: string
 *                 enum: ["Electronics", "Clothing", "Books", "Home", "Toys"]
 *                 example: "Electronics"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 29.99
 *               stock_status:
 *                 type: string
 *                 enum: ["in_stock", "out_of_stock"]
 *                 default: "in_stock"
 *                 example: "in_stock"
 *               sku:
 *                 type: string
 *                 pattern: "^[a-zA-Z0-9]{3,20}$"
 *                 example: "XYZ789"
 *               description:
 *                 type: string
 *                 maxLength: 50
 *                 example: "An updated description of the product."
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Request was successful
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: PD-1743359388386
 *                     name:
 *                       type: string
 *                       example: Product adfad
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                     description:
 *                       type: string
 *                       example: Description for Product 1
 *                     sku:
 *                       type: string
 *                       example: surprise1
 *                     stock_status:
 *                       type: string
 *                       example: in_stock
 *                     category:
 *                       type: string
 *                       example: Electronics
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T18:29:48.386Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T18:32:42.213Z
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 headers:
 *                   type: object
 *                   properties:
 *                     X-RateLimit-Limit:
 *                       type: string
 *                       example: "100"
 *                     X-RateLimit-Remaining:
 *                       type: string
 *                       example: "90"
 *                     X-RateLimit-Reset:
 *                       type: string
 *                       example: "1743363085"
 */
router.put("/:id", (req, res) => productController.updateProduct(req, res));
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes a product by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Product deleted successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 headers:
 *                   type: object
 *                   properties:
 *                     X-RateLimit-Limit:
 *                       type: string
 *                       example: "100"
 *                     X-RateLimit-Remaining:
 *                       type: string
 *                       example: "93"
 *                     X-RateLimit-Reset:
 *                       type: string
 *                       example: "1743363393"
 */
router.delete("/:id", (req, res) => productController.deleteProduct(req, res));

export default router;
