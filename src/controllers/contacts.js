// src/controllers/students.js
import createHttpError from "http-errors";
import { getAllContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
  const students = await getAllContacts();

  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data: students,
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
