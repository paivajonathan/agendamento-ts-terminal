import { Administrator } from "./models";
import { waitUser } from "./utils";
import readLine from "readline-sync";

function showMenu(): void {
  console.clear();
  console.log("1 - Cadastrar médico");
  console.log("2 - Listar médicos");
  console.log("3 - Cadastrar especialidade");
  console.log("4 - Listar especialidades");
  console.log("5 - Deslogar");
}

function registerDoctor(): void {
  console.clear();
  console.log("Cadastrar médico");
  waitUser();
}

function listDoctors(): void {
  console.clear();
  console.log("Listar médicos");
  waitUser();
}

function registerSpecialty(): void {
  console.clear();
  console.log("Cadastrar especialidade");
  waitUser();
}

function listSpecialties(): void {
  console.clear();
  console.log("Listar especialidades");
  waitUser();
}

function showAdministratorsScreen(administrator: Administrator) {
  let option: number = 0;

  do {
    showMenu();
    option = parseInt(readLine.question("> "));
    switch (option) {
      case 1:
        registerDoctor();
        break;
      case 2:
        listDoctors();
        break;
      case 3:
        registerSpecialty();
        break;
      case 4:
        listSpecialties();
        break;
      case 5:
        return;
      default:
        console.log("Opção inválida");
        break;
    }
  } while (option !== 5);
}

export { showAdministratorsScreen };