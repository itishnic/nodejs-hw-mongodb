import { Router } from "express";
const router = Router();

import { validateBody } from "../middlewares/validateBody.js";
import {
  createContactsSchema,
  updateContactSchema,
} from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

import { isValidId } from "../middlewares/isValidId.js";

import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

router.use(authenticate);

router.get(
  "/contacts",
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getContactsController)
);
router.get(
  "/contacts/:contactId",
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController)
);

router.post(
  "/register",
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController)
);

router.post(
  "/contacts",
  checkRoles(ROLES.TEACHER),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController)
);
router.patch(
  "/contacts/:contactId",
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);
router.delete(
  "/contacts/:contactId",
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteContactController)
);

export default router;
