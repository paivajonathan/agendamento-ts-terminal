import readLine from "readline-sync";
import { AppointmentController, DoctorController, HistoryController } from "../controllers/controllers";
import { Patient } from "../models/models";
import { continueTyping, waitUser } from "../utils";

class PatientView {
  private static getDoctors(): void {
    console.clear();

    const doctors = DoctorController.getAll();
    if (!doctors.length) {
      console.log("Nenhum médico cadastrado!");
      waitUser();
      return;
    }

    console.log("Médicos cadastrados:");
    doctors.forEach((doctor: string) => console.log(doctor));
    waitUser();
  }

  private static getAppointments(patientId: number): void {
    console.clear();

    const appointments = AppointmentController.getByPatientId(patientId);
    if (!appointments.length) {
      console.log("Nenhuma consulta cadastrada!");
      waitUser();
      return;
    }

    console.log("Consultas cadastradas:");
    appointments.forEach((appointment: string) => console.log(appointment));
    waitUser();
  }

  private static getHistory(patientId: number): void {
    console.clear()

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

  private static makeAppointment(patientId: number): void {
    do {
      console.clear();

      const doctorId = Number(readLine.question("ID do médico:\n> "));
      const date = readLine.question("Data da consulta (dd/mm/aaaa):\n> ");
      const time = readLine.question(`Horário da consulta (hh:mm):\n> `);
      const appointment = AppointmentController.create(date, patientId, doctorId, time);

      console.log(appointment.message);
      waitUser();

      if (appointment.status === 200) break;
      else if (!continueTyping()) break;
    } while (true);
  }

  private static showMenu(name: string): void {
    console.clear();
    console.log(`=========== Bem vindo(a) ${name} ===========`);
    console.log("Qual ação deseja realizar?");
    console.log("1 - Buscar médicos");
    console.log("2 - Buscar consultas");
    console.log("3 - Visualizar histórico");
    console.log("4 - Marcar consulta");
    console.log("5 - Deslogar");
  }

  public static showPatientsScreen(patient: Patient): void {
    let option: number = 0;

    do {
      PatientView.showMenu(patient.name);
      option = parseInt(readLine.question("> "));
      switch (option) {
        case 1:
          PatientView.getDoctors();
          break;
        case 2:
          PatientView.getAppointments(patient.id);
          break;
        case 3:
          PatientView.getHistory(patient.id);
          break;
        case 4:
          PatientView.makeAppointment(patient.id);
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
}

export default PatientView;
