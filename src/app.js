import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import errorHandler from "./middlewares/errorHandlers.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swaggerConfig.js";
import responseMiddleware from "./middlewares/responseMiddleware.js";
import config from "./config/env.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(config.rateLimit());
    this.app.use(responseMiddleware);
  }

  routes() {
    this.app.use("/health", healthRoutes);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use("/api/v1/products", productRoutes);
  }

  errorHandler() {
    this.app.use(errorHandler);
  }

  getServer() {
    return this.app;
  }
}

export default new App().getServer();
