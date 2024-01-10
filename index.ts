import readLine from "readline-sync";
import { login, register } from "./views/auth";
import { showInitialMenu, waitUser } from "./utils";
import seedDatabase from "./seeder";

function showMainScreen(): void {
  seedDatabase();
  let answer: number = 0;

  do {
    showInitialMenu();

    answer = parseInt(readLine.question("> "));

    switch (answer) {
      case 1:
        login();
        break;
      case 2:
        register();
        break;
      case 3:
        console.log("Saindo...");
        waitUser();
        break;
      default:
        console.log("Opção inválida");
        break;
    }
  } while (answer !== 3);
}

showMainScreen();