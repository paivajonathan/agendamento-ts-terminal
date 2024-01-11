import db from "../database/database";
import { Appointment, Doctor, Message, PresentialAppointment, VirtualAppointment } from "../models/models";

class AppointmentController {
  static confirm(appointmentId: number, doctorId: number): Message {
    try {
      const appointment = Appointment.getById(appointmentId);
      if (appointment.doctorId !== doctorId) return new Message(422, "Consulta inválida!");
      appointment.confirm();
      return new Message(200, "Consulta confirmada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao confirmar consulta: ${error.message}`);
    }
  }

  static cancel(appointmentId: number, doctorId: number): Message {
    try {
      const appointment = Appointment.getById(appointmentId);
      if (appointment.doctorId !== doctorId) return new Message(422, "Consulta inválida!");
      appointment.cancel();
      return new Message(200, "Consulta cancelada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cancelar consulta: ${error.message}`);
    }
  }

  static getByDoctorId(doctorId: number): string[] {
    const appointments = Appointment.getAll().filter((appointment: Appointment) => appointment.doctorId === doctorId);
    const toString = appointments.map((appointment: Appointment) => appointment.toString());
    return toString;
  }

  static getByPatientId(patientId: number): string[] {
    const appointments = Appointment.getAll().filter((appointment: Appointment) => appointment.patientId === patientId);
    const toString = appointments.map((appointment: Appointment) => appointment.toString());
    return toString;
  }

  static create(
    date: string,
    patientId: number,
    doctorId: number,
    time: string,
  ): Message {
    try {
      const doctor = Doctor.getById(doctorId);
      if (doctor.serviceType === "presencial") {
        PresentialAppointment.create(doctor.platformRoom, date, time, patientId, doctorId);
      } else if (doctor.serviceType === "virtual") {
        VirtualAppointment.create(doctor.platformRoom, date, time, patientId, doctorId);
      }
      return new Message(200, "Consulta marcada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao marcar consulta: ${error.message}`);
    }
  }
}

export default AppointmentController;
