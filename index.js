const productOperation = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await productOperation.listContacts();
      console.table(list);
      break;
    case "get":
      const contact = await productOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.table(contact);
      break;
    case "add":
      const newContact = await productOperation.addContact(name, email, phone);
      console.table(newContact);
      break;
    case "remove":
      const removeContact = await productOperation.removeContact(id);
      if (!removeContact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.table(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
