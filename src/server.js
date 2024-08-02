// src/server.js

import express from "express";
import pino from "pino-http";
import cors from "cors";
import { getAllContacts, getContactById } from "./services/contacts.js";
import { env } from "./utils/env.js";

const PORT = Number(env("PORT", "3000"));
const app = express();

app.get("/contacts", async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    message: "Successfully found contacts!",
    data: contacts,
  });
});

app.get("/contacts/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);


  if (!contact) {
    res.status(404).json({
      message: "Contact not found",
    });
    return;
  }


  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});




export const startServer = () => {


  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({
      message: "Hello world!",
    });
  });

  app.use("*", (req, res, next) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


};
