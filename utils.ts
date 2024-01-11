import readLine from "readline-sync";

function waitUser(): void {
  readLine.question("Pressione enter para continuar... ");
  console.clear();
}

function formatString(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function continueTyping(message: string = "Deseja tentar novamente? (s/n) "): boolean {
  const answer: string = readLine.question(message);
  return formatString(answer) === "s";
}

function getPersonData(): any[] {
  const email = readLine.question("Digite o email (email@gmail.com):\n> ");
  const password = readLine.question("Digite a senha (8 caracteres, com pelo menos: um caractere especial, uma letra maiúscula, uma minúscula e um número):\n> ");
  const name = readLine.question("Digite o nome:\n> ");
  const birthDate = readLine.question("Digite a data de nascimento (dd/mm/aaaa):\n> ");
  const gender = readLine.question("Digite o gênero (M, F ou O):\n> ");
  const cellphone = readLine.question("Digite o celular (11 dígitos, sem máscara):\n> ");
  return [email, password, name, birthDate, gender, cellphone]
}

export {
  waitUser,
  formatString,
  continueTyping,
  getPersonData,
};
