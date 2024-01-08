import { Appointment, Doctor, History, Patient, Specialty, User, Administrator, Cardiology, Dermatology } from "./models";

class Database {
  private _users: User[];
  private _patients: Patient[];
  private _doctors: Doctor[];
  private _administrators: Administrator[];
  private _appointments: Appointment[];
  private _histories: History[];
  private _specialties: Specialty[];

  private static instance: Database;
  private constructor() {
    this._users = [
      new User(1, "teste@gmail.com", "123456"),
      new User(2, "medico@gmail.com", "medico"),
      new User(2, "admin@gmail.com", "admin"),
    ];
    this._patients = [
      new Patient(1, "João", "01/01/2000", "Masculino", "999999999", "Unimed", "Rua 1", 1),
    ];
    this._doctors = [
      new Doctor(1, "Médico", "01/01/2000", "Masculino", "999999999", "123456", 1, 2),
    ];
    this._administrators = [
      new Administrator(1, "Admin", "01/01/2000", "Masculino", "999999999", "Administração", 3),
    ];
    this._appointments = [];
    this._histories = [];
    this._specialties = [
      new Dermatology(),
      new Cardiology(),
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