import { Appointment, Doctor, History, Patient, Specialty, User, Administrator } from "./models";

class Database {
  private _users: User[];
  private _patients: Patient[];
  private _doctors: Doctor[];
  private _admins: Administrator[];
  private _appointments: Appointment[];
  private _histories: History[];
  private _specialties: Specialty[];

  private static instance: Database;
  private constructor() {
    this._users = [
      new User(1, "teste@gmail.com", "123456"),
    ];
    this._patients = [
      new Patient(1, "João", "01/01/2000", "Masculino", "999999999", "Unimed", "Rua 1", 1),
    ];
    this._doctors = [];
    this._admins = [];
    this._appointments = [];
    this._histories = [];
    this._specialties = [];
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

  public get admins(): Administrator[] {
    return this._admins;
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