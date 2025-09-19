import { Router } from "express";
import { Controllers } from "../controllers";

function routes(controllers: Controllers) {
  const router = Router();

  // Webhook
  router.post("/visit", controllers.visitsController.visitWebhook);

  router.post("/visit/:visitId/protocol", controllers.visitsController.handleProtocol);
  router.post("/visit/:visitId/rate", controllers.visitsController.handleRate);

  // API
  //   router.post()
  return router;
}

export { routes };
