class HealthService {
  constructor() {
    this.health = {
      status: 'ok',
      message: 'Service is running smoothly',
    };
  }

  getHealth() {
    return this.health;
  }

  setHealth(status, message) {
    this.health.status = status;
    this.health.message = message;
  }
}
export default new HealthService();
