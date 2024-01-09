import {
  User,
  Patient,
  History,
  Doctor,
  Specialty,
  Administrator,
  Appointment,
  VirtualAppointment,
  PresentialAppointment,
  ClinicalSpecialty,
  SurgicalSpecialty,
} from "./models";

class Database {
  private static instance: Database;

  private _users: User[];
  private _patients: Patient[];
  private _doctors: Doctor[];
  private _administrators: Administrator[];
  private _appointments: Appointment[];
  private _histories: History[];
  private _specialties: Specialty[];

  private constructor() {
    this._users = [
      new User(1, "teste@gmail.com", "Teste@123"),
      new User(2, "medico@gmail.com", "Medico@123"),
      new User(3, "admin@gmail.com", "Admin@123"),
    ];
    this._patients = [
      new Patient(1, "João", "01/01/2000", "M", "86994717931", "Unimed", "Rua 1", 1),
    ];
    this._doctors = [
      new Doctor(1, "Médico", "01/01/2000", "M", "999999999", "123456", ["10:00"], 1, 2),
    ];
    this._administrators = [
      new Administrator(1, "Admin", "01/01/2000", "F", "999999999", "Administração", 3),
    ];
    this._appointments = [
      new VirtualAppointment(1, "Zoom", "01/01/2000", 1, 1),
      new PresentialAppointment(2, "Sala 1", "01/01/2000", 1, 1),
    ];
    this._histories = [];
    this._specialties = [
      new ClinicalSpecialty(1, "Cardiologia", "Cardiologista"),
      new SurgicalSpecialty(2, "Cirurgia Geral", "Cirurgião Geral"),
    ];
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public get users(): User[] {
    return this._users;
  }

  public get patients(): Patient[] {
    return this._patients;
  }

  public get doctors(): Doctor[] {
    return this._doctors;
  }

  public get administrators(): Administrator[] {
    return this._administrators;
  }

  public get appointments(): Appointment[] {
    return this._appointments;
  }

  public get histories(): History[] {
    return this._histories;
  }

  public get specialties(): Specialty[] {
    return this._specialties;
  }
}

const db = Database.getInstance();
export default db;