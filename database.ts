import {
  User,
  Patient,
  History,
  Doctor,
  Specialty,
  Administrator,
  Appointment,
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
    this._users = [];
    this._patients = [];
    this._doctors = [];
    this._administrators = [];
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
