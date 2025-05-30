import { Router } from 'express';
import {
    getUserData,
    getUserHistory,
} from "../controllers/dashboard.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/stats").get(getUserData);
router.route("/videos").get(getUserHistory);

export default router