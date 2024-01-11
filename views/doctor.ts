import readLine from "readline-sync";
import { AppointmentController, HistoryController, PatientController } from "../controllers/controllers";
import { Doctor } from "../models/models";
import { waitUser } from "../utils";

class DoctorView {
  private static showMenu(name: string) {
    console.log(`=========== Bem vindo(a) ${name} ===========`);
    console.log("1 - Listar pacientes");
    console.log("2 - Listar consultas");
    console.log("3 - Histórico do paciente");
    console.log("4 - Confirmar consulta");
    console.log("5 - Cancelar consulta");
    console.log("6 - Deslogar");
  }

  private static listPatients() {
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

  private static listAppointments(doctorId: number) {
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

  private static getHistory() {
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

  private static confirmAppointment(doctorId: number) {
    console.clear();
    const appointmentId = Number(readLine.question("Digite o id da consulta: "));
    const confirmation = AppointmentController.confirm(appointmentId, doctorId);
    console.log(confirmation.message);
    waitUser();
  }

  private static cancelAppointment(doctorId: number) {
    console.clear();
    const appointmentId = Number(readLine.question("Digite o id da consulta: "));
    const cancelation = AppointmentController.cancel(appointmentId, doctorId);
    console.log(cancelation.message);
    waitUser();
  }

  public static showScreen(doctor: Doctor) {
    let option: number = 0;

    do {
      console.clear();
      DoctorView.showMenu(doctor.name);

      option = Number(readLine.question("Escolha uma opção: "));

      switch (option) {
        case 1:
          DoctorView.listPatients();
          break;
        case 2:
          DoctorView.listAppointments(doctor.id);
          break;
        case 3:
          DoctorView.getHistory();
          break;
        case 4:
          DoctorView.confirmAppointment(doctor.id);
          break;
        case 5:
          DoctorView.cancelAppointment(doctor.id);
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
}

export default DoctorView;
