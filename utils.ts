import readLine from "readline-sync";

function waitUser(): void {
  readLine.question("Pressione enter para continuar");
  console.clear();
}

function showInitialMenu(): void {
  console.clear();
  console.log("=========== Bem vindo(a) ao sistema ===========");
  console.log("Qual ação deseja realizar?");
  console.log("1 - Realizar login");
  console.log("2 - Cadastrar-se");
  console.log("3 - Sair");
}

export { waitUser, showInitialMenu };
