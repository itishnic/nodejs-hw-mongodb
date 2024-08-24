import { Router } from 'express';


import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

import { isValidId } from '../middlewares/isValidId.js';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.use(authenticate);

router.get( '/', ctrlWrapper(getContactsController));
router.get( '/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post( '/', validateBody(createContactsSchema), ctrlWrapper(createContactController),);
router.patch('/:contactId', isValidId, validateBody(updateContactSchema),  ctrlWrapper(patchContactController),);
router.delete( '/:contactId', isValidId, ctrlWrapper(deleteContactController),);

export default router;
