import { Appointment, Patient } from "./models";
import { waitUser } from "./utils";
import readLine from "readline-sync";
import db from "./database";

function getDoctors(): void {
  const doctors = db.doctors;
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
  const appointments = db.appointments.filter(
    (appointment: Appointment) => appointment.patientId === patientId
  );
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
  const history = db.histories.filter(
    (history) => history.patientId === patientId
  );
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
    try {
      const doctorId = parseInt(readLine.question("ID do médico: "));
      const date = readLine.question("Data da consulta: ");
    
      const appointment = new Appointment(patientId, doctorId, date);
      db.appointments.push(appointment);
    
      console.log("Consulta marcada com sucesso!");
      waitUser();
    } catch (error) {
      console.log("Erro ao marcar consulta!");
      console.log(error.message);
      waitUser();
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