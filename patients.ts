import { Patient } from "./models";
import { waitUser } from "./utils";

function showPatientsScreen(patient: Patient): void {
  console.clear();
  console.log("=========== Bem vindo(a) à tela de pacientes ===========");
  console.log(`Bem vindo, ${patient.name}`);
  console.log("Qual ação deseja realizar?");
  console.log("1 - Buscar médicos");
  console.log("2 - Buscar consultas");
  console.log("3 - Deslogar");
  waitUser();
}

export { showPatientsScreen };