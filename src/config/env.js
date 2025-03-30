import dotenv from "dotenv";
import { getEnvVariable } from "../utils/index.js";
import rateLimit from "express-rate-limit";
dotenv.config()


export default {
    port: getEnvVariable("port"),
    swaggerDomain: getEnvVariable('swagger_domain'),
    nodeEnv: getEnvVariable('node_env'),
    isProduction: getEnvVariable('is_production'),
    rateLimit: ()=> rateLimit({
            windowMs: Number(getEnvVariable("rate_limit_time")) * 60 * 1000, // 15 minutes
            max: Number(getEnvVariable("rate_limit_max")), // 100 requests per IP
            message: {message:"Too many requests, please try again later."},
            standardHeaders: false, // Includes RateLimit headers
            legacyHeaders: true, // Disable deprecated headers
        })
    
    
};
