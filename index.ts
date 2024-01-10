import readLine from "readline-sync";
import seedDatabase from "./database/seeder";
import { waitUser } from "./utils";
import { AuthView } from "./views/views";

class MainView {
  private static showInitialMenu(): void {
    console.clear();
    console.log("=========== Bem vindo(a) ao sistema ===========");
    console.log("Qual ação deseja realizar?");
    console.log("1 - Realizar login");
    console.log("2 - Cadastrar-se");
    console.log("3 - Sair");
  }

  public static showMainScreen(): void {
    seedDatabase();
    let answer: number = 0;

    do {
      MainView.showInitialMenu();

      answer = parseInt(readLine.question("> "));

      switch (answer) {
        case 1:
          AuthView.login();
          break;
        case 2:
          AuthView.register();
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
}

MainView.showMainScreen();
