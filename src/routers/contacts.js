import { Router } from "express";
const router = Router();

import { validateBody } from "../middlewares/validateBody.js";
import { createContactsSchema } from "../validation/contacts.js";

import { isValidId } from "../middlewares/isValidId.js";


import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";





router.get(
  "/contacts",
  ctrlWrapper(getContactsController, )
);
router.get(
  "/contacts/:contactId",
  ctrlWrapper(getContactByIdController),
  isValidId
);
router.post(
  "/contacts",
  ctrlWrapper(createContactController),
  validateBody(createContactsSchema)
);
router.patch(
  "/contacts/:contactId",
  ctrlWrapper(patchContactController),
  validateBody(createContactsSchema),
  isValidId
);
router.delete(
  "/contacts/:contactId",
  ctrlWrapper(deleteContactController),
  isValidId
);

export default router;
