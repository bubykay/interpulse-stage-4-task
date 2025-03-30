
import healthService from "../services/healthService.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     HealthStatus:
 *       type: object
 *       properties: 
 *         status:
 *           type: string
 *           example: "success"
 *         message:
 *           type: string
 *           example: "Service is running smoothly"
 *         data:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: "ok"
 *             message:
 *               type: string
 *               example: "Service is running smoothly"
 *             statusCode:
 *               type: integer
 *               example: 200
 */
class HealthStatusController {
  constructor() {
    this.healthService = healthService;
  }

  async getHealthStatus(req, res) {
    try {
      const status = await this.healthService.getHealth();
      if (!status) {
        return res.status(503).json({ error: 'Service Unavailable' });
      }
      
      res.status(200).json(status);
    } catch (error) {
      console.error('Error fetching health status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
export default new HealthStatusController();