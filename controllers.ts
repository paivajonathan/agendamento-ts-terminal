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
    address: string
  ): Message {
    try {
      const newUserId = db.users.length + 1;
      const newUser = new User(newUserId, email, password);

      const newPatientId = db.patients.length + 1;
      const patient = new Patient(newPatientId, name, birthDate, gender, cellphone, healthInsurance, address, newUser.id);

      db.users.push(newUser);
      db.patients.push(patient);

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

  static getAvailableTimes(date: string, doctorId: number): string[] {
    const doctor = DoctorController.getById(doctorId);
    if (!doctor) return [];
    date = date.split("/").reverse().join("-");
    console.log(date);
    console.log(new Date(date));
    const docAppointments = db.appointments.filter((appointment: Appointment) => appointment.doctorId === doctorId);
    console.log(docAppointments);
    const appointments = db.appointments.filter((appointment: Appointment) => appointment.doctorId === doctorId && appointment.date.toISOString() === new Date(date).toISOString());
    console.log(appointments);
    const availableTimes = doctor.availableTimes.filter((time: string) => !appointments.some((appointment: Appointment) => appointment.time === time));
    return availableTimes;
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
    times: string[],
    specialtyId: number,
  ): Message {
    try {
      const newUserId = db.users.length + 1;
      const newUser = new User(newUserId, email, password);

      const newDoctorId = db.doctors.length + 1;
      const doctor = new Doctor(newDoctorId, name, birthDate, gender, cellphone, licenceNumber, times, specialtyId, newUser.id);

      db.users.push(newUser);
      db.doctors.push(doctor);

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

  static getByPatientId(patientId: number): Appointment[] {
    const appointments = db.appointments.filter((appointment: Appointment) => appointment.patientId === patientId);
    return appointments;
  }

  static createPresential(
    room: string,
    date: string,
    patientId: number,
    doctorId: number,
    time: string,
  ): Message {
    try {
      const doctor = DoctorController.getById(doctorId);
      if (!doctor) throw new Error("Médico não encontrado.");

      const newAppointmentId = db.appointments.length + 1;
      const appointment = new PresentialAppointment(newAppointmentId, room, date, patientId, doctorId, time);
      db.appointments.push(appointment);
      return new Message(200, "Consulta marcada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao marcar consulta: ${error.message}`);
    }
  }

  static createVirtual(patientId: number, doctorId: number, date: string): Message {
    try {
      const doctor = DoctorController.getById(doctorId);
      if (!doctor) throw new Error("Médico não encontrado.");

      const newAppointmentId = db.appointments.length + 1;
      const appointment = new VirtualAppointment(newAppointmentId, "zoom", date, patientId, doctorId, "10:00");
      db.appointments.push(appointment);
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
  static getAll(): Specialty[] {
    return db.specialties;
  }

  static registerClinical(name: string, area: string): Message {
    try {
      const newSpecialtyId = db.specialties.length + 1;
      const specialty = new ClinicalSpecialty(newSpecialtyId, name, area);
      db.specialties.push(specialty);
      return new Message(200, "Especialidade cadastrada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar especialidade: ${error.message}`);
    }
  }

  static registerSurgical(name: string, surgeryType: string): Message {
    try {
      const newSpecialtyId = db.specialties.length + 1;
      const specialty = new SurgicalSpecialty(newSpecialtyId, name, surgeryType);
      db.specialties.push(specialty);
      return new Message(200, "Especialidade cadastrada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar especialidade: ${error.message}`);
    }
  }
}

export { AdministratorController, AppointmentController, DoctorController, HistoryController, PatientController, SpecialtyController, UserController };

