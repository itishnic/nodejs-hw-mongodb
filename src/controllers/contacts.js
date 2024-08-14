
import createHttpError from "http-errors";
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from "../services/contacts.js";

import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const contact = await getAllContacts({page,
    perPage,});

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: contact,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res,) => {

    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: contact,
    });

};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contactData = req.body;

  try {
    const result = await updateContact(contactId, contactData);

    if (!result) {
      next(createHttpError(404, "Contact not found"));
      return;
    }

    res.json({
      status: 200,
      message: "Successfully patched a contact!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
