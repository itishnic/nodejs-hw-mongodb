import { Router } from "express";
const router = Router();


import {
  getContactsController,
  getContactByIdController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


router.get("/contacts", ctrlWrapper(getContactsController));
router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));

export default router;
