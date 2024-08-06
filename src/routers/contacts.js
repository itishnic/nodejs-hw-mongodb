import { Router } from "express";
const router = Router();

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

// const jsonParser = express.json();



router.get("/contacts", ctrlWrapper(getContactsController));
router.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));
router.post("/contacts", ctrlWrapper(createContactController));
router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));
router.patch("/contacts/:contactId", ctrlWrapper(patchContactController));
export default router;
