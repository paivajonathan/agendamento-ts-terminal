import readLine from "readline-sync";
import { AppointmentController, PatientController, HistoryController } from "./controllers";
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
        // confirmAppointment();
        break;
      case 5:
        // cancelAppointment();
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
