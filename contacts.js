const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        
        const contactIdString = contactId.toString();
        const contactById = contacts.find(
            (contact) => contact.id === contactIdString
        );

        if (contactById) {
            return contactById;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const contactsById = await getContactById(contactId);

        if (!contactsById) {
            return null;
        }

        const contacts = await listContacts();

        const contactIdString = contactId.toString();
        const newContactsList = contacts.filter(
            (contact) => contact.id !== contactIdString
        );
        await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf8");
        return contactsById;
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();

        const newContact = { id: nanoid(17), name, email, phone };
        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
        
        return newContact;
      } catch (error) {
        console.log(error);
      }
}

module.exports = { listContacts, getContactById, removeContact, addContact };