import express, { Router } from "express";
import { isAuthenticated, checkPermission } from "../middlewares/authMiddleware";
import contactController from "../controllers/contactController";

const contactRouter: Router = express.Router();

contactRouter.post(
    "/post",
    contactController.createContact
);
contactRouter.get(
    "/get/:contactId",
    isAuthenticated,
    checkPermission,
    contactController.findContactById
);
contactRouter.get(
    "/gets",
    isAuthenticated,
    checkPermission,
    contactController.findAllContacts
);
contactRouter.delete(
    "/delete/:contactId",
    isAuthenticated,
    checkPermission,
    contactController.deleteContactById
);

export default contactRouter;
