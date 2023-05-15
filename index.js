const argv = require("yargs").argv;
const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const сontactsList = await contacts.listContacts();
            console.log(сontactsList);

            break;

        case "get":
            const getContact = await contacts.getContactById(id);
            if (getContact) {
                console.log(getContact);
            } else {
                console.log(`Контакт із id=${id} відсутній.`);
            }

            break;

        case "add":
            const addContact = await contacts.addContact(name, email, phone);
            console.log(addContact);

            break;

        case "remove":
            const removeContact = await contacts.removeContact(id);

            if (removeContact) {
                console.log(removeContact);
            } else {
                console.log(`Контакт із id=${id} відсутній.`);
            }

            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);