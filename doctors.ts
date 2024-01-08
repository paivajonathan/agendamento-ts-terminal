import readLine from "readline-sync";
import { AppointmentController, PatientController } from "./controllers";
import { Doctor } from "./models";
import { waitUser } from "./utils";

function showMenu(name: string) {
  console.log(`Bem vindo(a), ${name}`);
  console.log("1 - Listar pacientes");
  console.log("2 - Listar consultas");
  console.log("3 - Deslogar");
}

function listPatients() {
  console.clear();
  const patients = PatientController.getAll();
  if (!patients.length) {
    console.log("Nenhum paciente cadastrado");
    waitUser();
    return;
  }
  console.log("Pacientes:");
  console.table(patients);
  waitUser();
}

function listAppointments() {
  console.clear();
  const appointments = AppointmentController.getAll();
  if (!appointments.length) {
    console.log("Nenhuma consulta cadastrada");
    waitUser();
    return;
  }
  console.log("Consultas:");
  console.table(appointments);
  waitUser();
}

function showDoctorsScreen(doctor: Doctor) {
  let option: number = 0;

  do {
    console.clear();
    showMenu(doctor.name);
    
    option = Number(readLine.question("Escolha uma opção: "));

    switch (option) {
      case 1:
        listPatients();
        break;
      case 2:
        listAppointments();
        break;
      case 3:
        console.log("Deslogando...");
        waitUser();
        break;
      default:
        console.log("Opção inválida");
        waitUser();
    }
  } while (option !== 3);
}

export { showDoctorsScreen };
