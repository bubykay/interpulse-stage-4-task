# **Product API Documentation**

## **Overview**

The **Product API** is a RESTful service that allows users to manage products. It provides CRUD operations and supports filtering, searching, and pagination.

## **Installation & Setup**

### **Prerequisites**

- Node.js (v16+ recommended)
- Yarn or npm

### **Steps to Set Up the Project**

```sh
# Clone the repository
git clone https://github.com/bubykay/interpulse-stage-4-task
cd interpulse-stage-4-task

# Install dependencies
yarn install  # or npm install

# Start the server
yarn dev  # or npm run dev
```

## **Base URL**

```
http://localhost:3000/api/v1
```

---

## **Endpoints**

### **1. Get All Products**

**GET /products**

#### **Query Parameters (Optional)**

| Parameter | Type | Description                               |
| --------- | ---- | ----------------------------------------- |
| `page`    | int  | Page number (default: 1)                  |
| `limit`   | int  | Number of products per page (default: 10) |

#### **Example Request**

```
GET /api/v1/products?page=1&limit=5
```

#### **Example Response**

```json
{
  "status": "success",
  "totalProducts": 50,
  "page": 1,
  "limit": 5,
  "totalPages": 10,
  "data": [
    { "id": "P001", "name": "Wireless Mouse", "price": 29.99 },
    { "id": "P002", "name": "Mechanical Keyboard", "price": 59.99 }
  ]
}
```

---

### **2. Get Product by ID**

**GET /products/:id**

#### **Example Request**

```
GET /api/v1/products/P001
```

#### **Example Response**

```json
{
  "id": "P001",
  "name": "Wireless Mouse",
  "category": "Electronics",
  "price": 29.99,
  "stock_status": "in_stock",
  "sku": "WM-001",
  "description": "A high-precision wireless mouse with ergonomic design."
}
```

---

### **3. Create a New Product**

**POST /products**

#### **Request Body (JSON)**

```json
{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "price": 29.99,
  "stock_status": "in_stock",
  "sku": "WM-001",
  "description": "A high-precision wireless mouse with ergonomic design."
}
```

#### **Response**

```json
{
  "status": "success",
  "message": "Product created successfully",
  "data": {
    "id": "P1709136356352",
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 29.99,
    "stock_status": "in_stock",
    "sku": "WM-001",
    "description": "A high-precision wireless mouse with ergonomic design."
  }
}
```

---

### **4. Update a Product**

**PUT /products/:id**

#### **Request Body (JSON)**

```json
{
  "price": 24.99,
  "stock_status": "out_of_stock"
}
```

#### **Response**

```json
{
  "status": "success",
  "message": "Product updated successfully",
  "data": {
    "id": "P001",
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 24.99,
    "stock_status": "out_of_stock",
    "sku": "WM-001",
    "description": "A high-precision wireless mouse with ergonomic design."
  }
}
```

---

### **5. Delete a Product**

**DELETE /products/:id**

#### **Example Request**

```
DELETE /api/v1/products/P001
```

#### **Response**

```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```

---

## **Filtering & Searching**

- **By Category:** `GET /products?category=Electronics`
- **By Price Range:** `GET /products?minPrice=10&maxPrice=50`
- **By Name (Partial Search):** `GET /products?name=mouse`
- **By Stock Status:** `GET /products?stock_status=in_stock`

---

## **Rate Limiting**

Each client is limited to 4 requests per 15 minutes.
Headers included in responses:

```json
{
  "X-RateLimit-Limit": 4,
  "X-RateLimit-Remaining": 2,
  "X-RateLimit-Reset": 1709136700
}
```

---

## **Error Handling**

#### **Common Error Responses**

```json
{
  "status": "error",
  "message": "Product not found"
}
```

```json
{
  "status": "error",
  "message": "Invalid request body"
}
```

---

## **License**

MIT License.
