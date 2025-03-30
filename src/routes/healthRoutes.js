
import { Router } from 'express';
import healthController from '../controllers/healthController.js';
const router = Router();
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API.
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Service is running smoothly"
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: "ok"
 *                     message:
 *                       type: string
 *                       example: "Service is running smoothly"
 *                     statusCode:
 *                       type: integer
 *                       example: 200
 */

router.get('/', (req, res) => healthController.getHealthStatus(req, res));
export default router;
