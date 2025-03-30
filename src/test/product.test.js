import request from "supertest";
import app from "../app"; // Assuming your Express app is exported from app.js

describe("Product Validation Tests", () => {
  const endpoint = "/api/products"; // Replace with your actual endpoint

  it("should create a product successfully with valid data", async () => {
    const validProduct = {
      name: "Smartphone",
      category: "Electronics",
      price: 299.99,
      stock_status: "in_stock",
      sku: "SP12345",
      description: "A high-quality smartphone",
    };

    const response = await request(app).post(endpoint).send(validProduct);
    expect(response.status).toBe(201); // Assuming 201 for successful creation
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("id");
  });

  it("should fail when 'name' is missing", async () => {
    const invalidProduct = {
      category: "Electronics",
      price: 299.99,
      stock_status: "in_stock",
      sku: "SP12345",
      description: "A high-quality smartphone",
    };

    const response = await request(app).post(endpoint).send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"name" is required');
  });

  it("should fail when 'price' is negative", async () => {
    const invalidProduct = {
      name: "Smartphone",
      category: "Electronics",
      price: -10,
      stock_status: "in_stock",
      sku: "SP12345",
      description: "A high-quality smartphone",
    };

    const response = await request(app).post(endpoint).send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"price" cannot be negative');
  });

  it("should fail when 'category' is invalid", async () => {
    const invalidProduct = {
      name: "Smartphone",
      category: "InvalidCategory",
      price: 299.99,
      stock_status: "in_stock",
      sku: "SP12345",
      description: "A high-quality smartphone",
    };

    const response = await request(app).post(endpoint).send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      '"category" must be one of Electronics, Clothing, Books, Home, Toys'
    );
  });

  it("should fail when 'sku' is not alphanumeric", async () => {
    const invalidProduct = {
      name: "Smartphone",
      category: "Electronics",
      price: 299.99,
      stock_status: "in_stock",
      sku: "SP@123!",
      description: "A high-quality smartphone",
    };

    const response = await request(app).post(endpoint).send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('"sku" must be alphanumeric');
  });

  it("should fail when 'description' exceeds max length", async () => {
    const invalidProduct = {
      name: "Smartphone",
      category: "Electronics",
      price: 299.99,
      stock_status: "in_stock",
      sku: "SP12345",
      description: "A".repeat(51), // Exceeds max length of 50
    };

    const response = await request(app).post(endpoint).send(invalidProduct);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      '"description" should have at most 50 characters'
    );
  });
});
