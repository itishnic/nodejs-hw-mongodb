import { model, Schema } from "mongoose";

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: true,
    },

    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
    parentId: { type: Schema.Types.ObjectId, ref: 'users' },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const ContactsCollection = model("contacts", contactsSchema);
