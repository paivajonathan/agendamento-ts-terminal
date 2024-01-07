class User {
  private _email: string;
  private _password: string;
  private _role: string;

  constructor(email: string, password: string, role: string) {
    this._email = email;
    this._password = password;
    this._role = role;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get role(): string {
    return this._role;
  }

  public asObject(): object {
    return {
      email: this.email,
      password: this.password,
      role: this.role,
    }
  }
}

class Person {
  private _name: string;
  private _birthDate: Date;
  private _gender: string;
  private _cellphone: string;
  private _userId: number;

  constructor(
    name: string,
    birthDate: Date,
    gender: string,
    cellphone: string,
    userId: number,
  ) {
    this._name = name;
    this._birthDate = birthDate;
    this._gender = gender;
    this._cellphone = cellphone;
    this._userId = userId;
  }

  public get name(): string {
    return this._name;
  }

  public get birthDate(): Date {
    return this._birthDate;
  }

  public get gender(): string {
    return this._gender;
  }

  public get cellphone(): string {
    return this._cellphone;
  }

  public set birthDate(birthDate: Date) {
    this._birthDate = birthDate;
  }

  public set gender(gender: string) {
    this._gender = gender;
  }

  public set cellphone(cellphone: string) {
    this._cellphone = cellphone;
  }

  public asObject(): object {
    return {
      name: this.name,
      birthDate: this.birthDate,
      gender: this.gender,
      cellphone: this.cellphone,
    }
  }
}

class Patient extends Person {
  private _healthInsurance: string;
  private _address: string;

  constructor(
    name: string,
    birthDate: Date,
    gender: string,
    cellphone: string,
    healthInsurance: string,
    address: string,
    userId: number,
  ) {
    super(name, birthDate, gender, cellphone, userId);
    this._healthInsurance = healthInsurance;
    this._address = address;
  }

  public get healthInsurance(): string {
    return this._healthInsurance;
  }

  public get address(): string {
    return this._address;
  }

  public set healthInsurance(healthInsurance: string) {
    this._healthInsurance = healthInsurance;
  }

  public set address(address: string) {
    this._address = address;
  }

  public asObject(): object {
    return {
      ...super.asObject(),
      healthInsurance: this.healthInsurance,
      address: this.address,
    }
  }
}

class History {
  private _patient: Patient;
  private _allergies: string[];
  private _medicationsInUse: string[];

  constructor(patient: Patient) {
    this._patient = patient;
    this._allergies = [];
    this._medicationsInUse = [];
  }

  public addAllergy(allergy: string) {
    if (this._allergies.includes(allergy)) return;
    this._allergies.push(allergy);
  }

  public addMedicationInUse(medication: string) {
    if (this._medicationsInUse.includes(medication)) return;
    this._medicationsInUse.push(medication);
  }

  public get patient(): Patient {
    return this._patient;
  }

  public get allergies(): string[] {
    return this._allergies;
  }

  public get medicationsInUse(): string[] {
    return this._medicationsInUse;
  }
}

abstract class Specialty {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Cardiology extends Specialty {
  constructor() {
    super("Cardiology");
  }
}

class Dermatology extends Specialty {
  constructor() {
    super("Dermatology");
  }
}

class Doctor extends Person {
  private _licenceNumber: string;
  private _specialty: Specialty;

  constructor(
    name: string,
    birthDate: Date,
    gender: string,
    cellphone: string,
    licenceNumber: string,
    specialty: Specialty,
    userId: number,
  ) {
    super(name, birthDate, gender, cellphone, userId);
    this._licenceNumber = licenceNumber;
    this._specialty = specialty;
  }
}

class Appointment {
  private _patient: Patient;
  private _doctor: Doctor;
  private _date: Date;

  constructor(
    patient: Patient,
    doctor: Doctor,
    date: Date
  ) {
    this._patient = patient;
    this._doctor = doctor;
    this._date = date;
  }
}

export { Appointment, Doctor, History, Patient, User };
