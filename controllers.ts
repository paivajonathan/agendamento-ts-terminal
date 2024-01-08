import db from './database';
import { Appointment, Doctor, History, Patient, User, Administrator } from './models';

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
  static getPatientByUserId(userId: number): Patient | undefined {
    const patient = db.patients.find((patient: Patient) => patient.userId === userId);
    return patient;
  }

  static register(email: string, password: string, name: string, birthDate: string, gender: string, cellphone: string, healthInsurance: string, address: string): object {
    try {
      const newUserId = db.users.length + 1;
      const newUser = new User(newUserId, email, password);

      const newPatientId = db.patients.length + 1;
      const patient = new Patient(newPatientId, name, birthDate, gender, cellphone, healthInsurance, address, newUser.id);

      db.users.push(newUser);
      db.patients.push(patient);

      return { status: 200, message: "Paciente cadastrado com sucesso!" };
    } catch (error: any) {
      return { status: 422, message: `Ocorreu um erro ao cadastrar paciente: ${error.message}` };
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

  static create(patientId: number, doctorId: number, date: string): object {
    try {
      const doctor = DoctorController.getById(doctorId);
      if (!doctor) throw new Error("Médico não encontrado.");

      const newAppointmentId = db.appointments.length + 1;
      const appointment = new Appointment(newAppointmentId, patientId, doctorId, date);
      db.appointments.push(appointment);
      return { status: 200, message: "Consulta marcada com sucesso!" };
    } catch (error: any) {
      return { status: 422, message: `Ocorreu um erro ao marcar consulta: ${error.message}` };
    }
  }
}

class HistoryController {
  static getByPatientId(patientId: number): History[] {
    const history = db.histories.filter((history: History) => history.patientId === patientId);
    return history;
  }
}

export { AppointmentController, DoctorController, HistoryController, PatientController, UserController, AdministratorController };

