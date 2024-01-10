import db from "../database/database";
import History from "./history";
import Person from "./person";
import User from "./user";

class Patient extends Person {
  private _healthInsurance: string = "";
  private _address: string = "";

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    healthInsurance: string,
    address: string,
    userId: number,
  ) {
    super(id, name, birthDate, gender, cellphone, userId);
    this.healthInsurance = healthInsurance;
    this.address = address;
  }

  public get healthInsurance(): string { return this._healthInsurance; }
  public get address(): string { return this._address; }

  public set healthInsurance(healthInsurance: string) {
    if (healthInsurance.length < 3 || healthInsurance.length > 100) throw new Error("Plano de saúde inválido.");
    this._healthInsurance = healthInsurance;
  }

  public set address(address: string) {
    if (address.length < 3 || address.length > 100) throw new Error("Endereço inválido.");
    this._address = address;
  }

  public toString(): string {
    return `${super.toString()}, Plano de saúde: ${this.healthInsurance}, Endereço: ${this.address}`;
  }

  public static getAll(): Patient[] {
    return db.patients;
  }

  public static getById(patientId: number): Patient {
    const patient = db.patients.find((patient: Patient) => patient.id === patientId);
    if (!patient) throw new Error("Paciente não encontrado.");
    return patient;
  }

  public static create(
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
  ): Patient {
    const user = new User(
      db.users.length + 1,
      email,
      password,
    );
    const patient = new Patient(
      db.patients.length + 1,
      name,
      birthDate,
      gender,
      cellphone,
      healthInsurance,
      address,
      user.id,
    );
    const history = new History(
      db.histories.length + 1,
      allergies,
      medications,
      comorbities,
      patient.id,
    );
    db.users.push(user);
    db.patients.push(patient);
    db.histories.push(history);
    return patient;
  }
}

export default Patient;