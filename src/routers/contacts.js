import { Router } from "express";
const router = Router();

import { validateBody } from "../middlewares/validateBody.js";
import { createContactsSchema,updateContactSchema } from "../validation/contacts.js";


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
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/register',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);


router.post(
  "/contacts",
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),

);
router.patch(
  "/contacts/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),


);
router.delete(
  "/contacts/:contactId",
  isValidId,
  ctrlWrapper(deleteContactController),

);

export default router;
