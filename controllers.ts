import db from './database';
import { Message, Administrator, Appointment, ClinicalSpecialty, Doctor, History, Patient, PresentialAppointment, Specialty, SurgicalSpecialty, User, VirtualAppointment } from './models';

class UserController {
  static authenticate(email: string, password: string): User | undefined {
    const user = db.users.find((user: User) => user.email === email && user.password === password);
    return user;
  }

  static getByEmail(email: string): User | undefined {
    const user = db.users.find((user: User) => user.email === email);
    return user;
  }
}

class PatientController {
  static getAll(): Patient[] {
    return db.patients;
  }

  static getPatientByUserId(userId: number): Patient | undefined {
    const patient = db.patients.find((patient: Patient) => patient.userId === userId);
    return patient;
  }

  static register(
    email: string,
    password: string,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    healthInsurance: string,
    address: string,
    allergies: string[],
    medications: string[],
    comorbities: string[],
  ): Message {
    try {
      Patient.create(
        email,
        password,
        name,
        birthDate,
        gender,
        cellphone,
        healthInsurance,
        address,
        allergies,
        medications,
        comorbities,
      );
      return new Message(200, "Paciente cadastrado com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar paciente: ${error.message}`);
    }
  }
}

class DoctorController {
  static getAll(): Doctor[] {
    return db.doctors;
  }

  static getById(doctorId: number): Doctor | undefined {
    const doctor = db.doctors.find((doctor: Doctor) => doctor.id === doctorId);
    return doctor;
  }

  static getByUserId(userId: number): Doctor | undefined {
    const doctor = db.doctors.find((doctor: Doctor) => doctor.userId === userId);
    return doctor;
  }

  static register(
    email: string,
    password: string,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    licenceNumber: string,
    appointmentType: string,
    platformRoom: string,
    times: string[],
    specialtyId: number,
  ): Message {
    try {
      Doctor.create(
        email,
        password,
        name,
        birthDate,
        gender,
        cellphone,
        licenceNumber,
        appointmentType,
        platformRoom,
        times,
        specialtyId,
      );
      return new Message(200, "Médico cadastrado com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar médico: ${error.message}`);
    }
  }
}

class AdministratorController {
  static getAll(): Administrator[] {
    return db.administrators;
  }

  static getById(administratorId: number): Administrator | undefined {
    const administrator = db.administrators.find((administrator: Administrator) => administrator.id === administratorId);
    return administrator;
  }

  static getByUserId(userId: number): Administrator | undefined {
    const administrator = db.administrators.find((administrator: Administrator) => administrator.userId === userId);
    return administrator;
  }
}

class AppointmentController {
  static getAll(): Appointment[] {
    return db.appointments;
  }

  static getByDoctorId(doctorId: number): string[] {
    const appointments = Appointment.getAll().filter((appointment: Appointment) => appointment.doctorId === doctorId);
    console.log(appointments);
    const toString = appointments.map((appointment: Appointment) => appointment.toString());
    console.log(toString);
    return toString;
  }

  static getByPatientId(patientId: number): Appointment[] {
    const appointments = db.appointments.filter((appointment: Appointment) => appointment.patientId === patientId);
    return appointments;
  }

  static create(
    date: string,
    patientId: number,
    doctorId: number,
    time: string,
  ): Message {
    try {
      const doctor = Doctor.getById(doctorId);
      if (doctor.appointmentType === "presential") {
        PresentialAppointment.create(doctor.platformRoom, date, time, patientId, doctorId);
      } else if (doctor.appointmentType === "virtual") {
        VirtualAppointment.create(doctor.platformRoom, date, time, patientId, doctorId);
      }
      return new Message(200, "Consulta marcada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao marcar consulta: ${error.message}`);
    }
  }
}

class HistoryController {
  static getByPatientId(patientId: number): History[] {
    const history = db.histories.filter((history: History) => history.patientId === patientId);
    return history;
  }
}

class SpecialtyController {
  static getAll(): string[] {
    const specialties = Specialty.getAll();
    const toString = specialties.map((specialty: Specialty) => specialty.toString());
    return toString;
  }

  static registerClinical(name: string, area: string): Message {
    try {
      ClinicalSpecialty.create(name, area);
      return new Message(200, "Especialidade cadastrada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar especialidade: ${error.message}`);
    }
  }

  static registerSurgical(name: string, surgeryType: string): Message {
    try {
      SurgicalSpecialty.create(name, surgeryType);
      return new Message(200, "Especialidade cadastrada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar especialidade: ${error.message}`);
    }
  }
}

export { AdministratorController, AppointmentController, DoctorController, HistoryController, PatientController, SpecialtyController, UserController };

