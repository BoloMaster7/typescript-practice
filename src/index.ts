const inquirer = require('inquirer');
const consola = require('consola')

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}


const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, "Bye bye!");
        return;
    }

    startApp();
  });
}

class Message {
  constructor(private content: string) { }

   show() {
      console.log(this.content);
  }

   capitalize() {
      const capitalizedLetter = this.content.charAt(0);
      capitalizedLetter.toUpperCase();
      const remainingLetters = this.content.slice(1);
      return capitalizedLetter + remainingLetters;
  }

   toUpperCase() {
      this.content.toUpperCase();
  }

  toLowerCase() {
      this.content.toLowerCase();
  }

  static showColorized(MessageVariant: string, text: string) {

      if (MessageVariant === 'success') {
          consola.success(text);
      } else if (MessageVariant === 'error') {
          consola.error(text);
      } else if (MessageVariant === 'info') {
          consola.info(text);
      }
  }
}


const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");
