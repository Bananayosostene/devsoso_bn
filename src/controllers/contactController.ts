import { Request, Response } from "express";
import ContactModel from "../database/models/contactModel";


export default class contactController {

static createContact = async (req: Request, res: Response) => {
  try {
    const newContact = new ContactModel({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const savedContact = await newContact.save();

    return res.status(201).json({
      message: "Contact created successfully",
      data: savedContact,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
};

  static findAllContacts = async (req: Request, res: Response) => {
  try {
    const arrayOfContacts = await ContactModel.find();

    if (arrayOfContacts.length > 0) {
      return res.status(200).json({
        message: "Contacts found",
        data: arrayOfContacts,
      });
    } else {
      return res.status(404).json({
        message: "No contacts found",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
};

    
  static findContactById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.contactId;
    const contact = await ContactModel.findById(id);

    if (contact) {
      return res.status(200).json({
        message: "Contact found",
        data: contact,
      });
    }
    else {
      return res.status(404).json({
        message: "Contact not found",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
    };
    
  static deleteContactById = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.contactId;

    const contact = await ContactModel.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
        data: null,
      });
    }

    const deletedContact = await ContactModel.findByIdAndDelete(id);

    if (deletedContact) {
      return res.status(200).json({
        message: "Contact deleted successfully",
        data: deletedContact,
      });
    } else {
      return res.status(500).json({
        message: "Failed to delete contact",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: null,
      theErrorIs: error,
    });
  }
};


}