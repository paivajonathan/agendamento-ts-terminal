class User {
  private _id: number;
  private _email: string;
  private _password: string;

  constructor(id: number, email: string, password: string) {
    this._id = id;
    this._email = email;
    this._password = password;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }
}

class Person {
  private _id: number;
  private _name: string;
  private _birthDate: Date;
  private _gender: string;
  private _cellphone: string;
  private _userId: number;

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    userId: number,
  ) {
    this._id = id;
    this._name = name;
    this._birthDate = new Date(birthDate);
    this._gender = gender;
    this._cellphone = cellphone;
    this._userId = userId;
  }

  public get id(): number {
    return this._id;
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

  public get userId(): number {
    return this._userId;
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
}

class Administrator extends Person {
  private _role: string;

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    role: string,
    userId: number,
  ) {
    super(id, name, birthDate, gender, cellphone, userId);
    this._role = role;
  }
}

class Patient extends Person {
  private _healthInsurance: string;
  private _address: string;

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
}

class History {
  private _patientId: number;
  private _allergies: string[];
  private _medicationsInUse: string[];

  constructor(patientId: number) {
    this._patientId = patientId;
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

  public get patientId(): number {
    return this._patientId;
  }

  public get allergies(): string[] {
    return this._allergies;
  }

  public get medicationsInUse(): string[] {
    return this._medicationsInUse;
  }
}

abstract class Specialty {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }
}

class SurgicalSpecialty extends Specialty {
  private _surgeryType: string;

  constructor(id: number, name: string, surgeryType: string) {
    super(id, name);
    this._surgeryType = surgeryType;
  }
}

class ClinicalSpecialty extends Specialty {
  private _clinicalArea: string;

  constructor(id: number, name: string, clinicalArea: string) {
    super(id, name);
    this._clinicalArea = clinicalArea;
  }
}

class Doctor extends Person {
  private _licenceNumber: string;
  private _specialtyId: number;

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    licenceNumber: string,
    specialtyId: number,
    userId: number,
  ) {
    super(id, name, birthDate, gender, cellphone, userId);
    this._licenceNumber = licenceNumber;
    this._specialtyId = specialtyId;
  }
}

class Appointment {
  private _id: number;
  private _patientId: number = 0;
  private _doctorId: number = 0;
  private _date: Date = new Date();

  constructor(
    id: number,
    patientId: number,
    doctorId: number,
    date: string
  ) {
    this._id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
  }

  public get patientId(): number {
    return this._patientId;
  }

  public get doctorId(): number {
    return this._doctorId;
  }

  public get date(): Date {
    return this._date;
  }

  public set patientId(patientId: number) {
    if (isNaN(patientId)) throw new Error("ID do paciente inválido.");
    this._patientId = patientId;
  }

  public set doctorId(doctorId: number) {
    if (isNaN(doctorId)) throw new Error("ID do médico inválido.");
    console.log(doctorId);
    this._doctorId = doctorId;
  }

  public set date(date: string) {
    const regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!regex.test(date)) throw new Error("Data inválida.");
    this._date = new Date(date);
  }
}

class VirtualAppointment extends Appointment {
  private _platform: string;

  constructor(
    id: number,
    platform: string,
    date: string,
    patientId: number,
    doctorId: number,
  ) {
    super(id, patientId, doctorId, date);
    this._platform = platform;
  }
}

class PresentialAppointment extends Appointment {
  private _room: string;

  constructor(
    id: number,
    room: string,
    date: string,
    patientId: number,
    doctorId: number,
  ) {
    super(id, patientId, doctorId, date);
    this._room = room;
  }
}

export {
  User,
  Patient,
  Doctor,
  Administrator,
  Appointment,
  VirtualAppointment,
  PresentialAppointment,
  History,
  Specialty,
  ClinicalSpecialty,
  SurgicalSpecialty
};
