import readLine from "readline-sync";
import { AppointmentController, DoctorController, HistoryController } from "./controllers";
import { Patient } from "./models";
import { waitUser } from "./utils";

function getDoctors(): void {
  const doctors = DoctorController.getAll();
  if (!doctors.length) {
    console.log("Nenhum médico cadastrado!");
    waitUser();
    return;
  }
  console.log("Médicos cadastrados:");
  console.table(doctors);
  waitUser();
}

function getAppointments(patientId: number): void {
  const appointments = AppointmentController.getByPatientId(patientId);
  if (!appointments.length) {
    console.log("Nenhuma consulta cadastrada!");
    waitUser();
    return;
  }
  console.log("Consultas cadastradas:");
  console.table(appointments);
  waitUser();
}

function getHistory(patientId: number): void {
  const history = HistoryController.getByPatientId(patientId);
  if (!history.length) {
    console.log("Nenhum histórico cadastrado!");
    waitUser();
    return;
  }
  console.log("Histórico:");
  console.table(history);
  waitUser();
}

function makeAppointment(patientId: number): void {
  do {
    console.clear();
    const doctorId = Number(readLine.question("ID do médico: "));
    const date = readLine.question("Data da consulta: ");

    const appointment: any = AppointmentController.create(patientId, doctorId, date);

    if (appointment.status === 200) {
      console.log(appointment.message);
      waitUser();
      break;
    } else {
      console.log(appointment.message);
      waitUser();
      const answer: string = readLine.question("Deseja tentar novamente? (s/n) ");
      if (answer.toLowerCase() !== "s") break;
    }
  } while (true);
}

function showMenu(name: string): void {
  console.clear();
  console.log(`Bem vindo, ${name}`);
  console.log("Qual ação deseja realizar?");
  console.log("1 - Buscar médicos");
  console.log("2 - Buscar consultas");
  console.log("3 - Visualizar histórico");
  console.log("4 - Marcar consulta");
  console.log("5 - Deslogar");
}

function showPatientsScreen(patient: Patient): void {
  let option: number = 0;

  do {
    showMenu(patient.name);
    option = parseInt(readLine.question("> "));
    switch (option) {
      case 1:
        getDoctors();
        break;
      case 2:
        getAppointments(patient.id);
        break;
      case 3:
        getHistory(patient.id);
        break;
      case 4:
        makeAppointment(patient.id);
        break;
      case 5:
        console.log("Deslogando...");
        break;
      default:
        console.log("Opção inválida!");
        break;
    }
  } while (option !== 5);
}

export { showPatientsScreen };
