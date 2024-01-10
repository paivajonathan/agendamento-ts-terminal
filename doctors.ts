import readLine from "readline-sync";
import { AppointmentController, PatientController, HistoryController } from "./controllers";
import { Doctor } from "./models";
import { waitUser } from "./utils";

function showMenu(name: string) {
  console.log(`=========== Bem vindo(a) ${name} ===========`);
  console.log("1 - Listar pacientes");
  console.log("2 - Listar consultas");
  console.log("3 - Histórico do paciente");
  console.log("4 - Confirmar consulta");
  console.log("5 - Cancelar consulta");
  console.log("6 - Deslogar");
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
  patients.forEach((patient: string) => console.log(patient));
  waitUser();
}

function listAppointments(doctorId: number) {
  console.clear();
  const appointments = AppointmentController.getByDoctorId(doctorId);
  if (!appointments.length) {
    console.log("Nenhuma consulta cadastrada");
    waitUser();
    return;
  }
  console.log("Consultas:");
  appointments.forEach((appointment: string) => console.log(appointment));
  waitUser();
}

function getHistory() {
  console.clear();
  const patientId = Number(readLine.question("Digite o id do paciente: "));
  const history = HistoryController.getByPatientId(patientId);
  if (history.status !== 200) {
    console.log(history.message);
    waitUser();
    return;
  }
  console.log("Histórico:");
  console.log(history.data);
  waitUser();
}

function confirmAppointment(doctorId: number) {
  console.clear();
  const appointmentId = Number(readLine.question("Digite o id da consulta: "));
  const confirmation = AppointmentController.confirm(appointmentId, doctorId);
  console.log(confirmation.message);
  waitUser();
}

function cancelAppointment(doctorId: number) {
  console.clear();
  const appointmentId = Number(readLine.question("Digite o id da consulta: "));
  const cancelation = AppointmentController.cancel(appointmentId, doctorId);
  console.log(cancelation.message);
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
        listAppointments(doctor.id);
        break;
      case 3:
        getHistory();
        break;
      case 4:
        confirmAppointment(doctor.id);
        break;
      case 5:
        cancelAppointment(doctor.id);
        break;
      case 6:
        console.log("Saindo...");
        waitUser();
        break;
      default:
        console.log("Opção inválida");
        waitUser();
    }
  } while (option !== 6);
}

export { showDoctorsScreen };
