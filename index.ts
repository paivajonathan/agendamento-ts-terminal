import readLine from "readline-sync";
import { login, register } from "./auth";
import { showInitialMenu } from "./utils";

function showMainScreen(): void {
  const answer: number = 0;

  do {
    showInitialMenu();

    const answer: number = parseInt(readLine.question("Digite o número da ação:"));

    switch (answer) {
      case 1:
        login();
        break;
      case 2:
        register();
        break;
      case 3:
        console.log("Saindo...");
        break;
      default:
        console.log("Opção inválida");
        break;
    }
  } while (answer !== 3);
}

showMainScreen();