import db from "./database";

class Message {
  constructor(public status: number, public message: string) {
    this.status = status;
    this.message = message;
  }
}

class User {
  private _id: number = 0;
  private _email: string = "";
  private _password: string = "";

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  public get email(): string { return this._email; }
  public get password(): string { return this._password; }
  public get id(): number { return this._id; }
  public set email(email: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(email)) throw new Error("Email inválido.");
    this._email = email;
  }
  public set password(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    if (!regex.test(password)) throw new Error("Senha inválida.");
    this._password = password;
  }
  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }
}

class Person {
  private _id: number = 0;
  private _name: string = "";
  private _birthDate: Date = new Date();
  private _gender: string = "";
  private _cellphone: string = "";
  private _userId: number = 0;

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    userId: number,
  ) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
    this.cellphone = cellphone;
    this.userId = userId;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }
  public get birthDate(): Date { return this._birthDate; }
  public get gender(): string { return this._gender; }
  public get cellphone(): string { return this._cellphone; }
  public get userId(): number { return this._userId; }

  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public set name(name: string) {
    if (name.length < 3 || name.length > 100) throw new Error("Nome inválido.");
    this._name = name;
  }

  public set birthDate(birthDate: string) {
    const regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!regex.test(birthDate.toString())) throw new Error("Data de nascimento inválida.");
    birthDate = birthDate.split("/").reverse().join("-");
    this._birthDate = new Date(birthDate);
  }

  public set gender(gender: string) {
    const options = ["M", "F", "O"];
    if (!(options.includes(gender))) throw new Error("Gênero inválido.");
    this._gender = gender;
  }

  public set cellphone(cellphone: string) {
    const regex = /^(\d{2})?(\d{9})$/;
    if (!regex.test(cellphone)) throw new Error("Número de celular inválido.");
    this._cellphone = cellphone;
  }

  public set userId(userId: number) {
    if (isNaN(userId) || userId <= 0) throw new Error("ID de usuário inválido.");
    this._userId = userId;
  }
}

class Administrator extends Person {
  private _role: string = "";

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
    this.role = role;
  }

  public get role(): string { return this._role; }

  public set role(role: string) {
    if (role.length < 3 || role.length > 100) throw new Error("Cargo inválido.");
    this._role = role;
  }
}

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
}

class History {
  private _patientId: number = 0;
  private _allergies: string[] = [];
  private _medicationsInUse: string[] = [];

  constructor(
    patientId: number,
    allergies: string[],
    medicationsInUse: string[],
  ) {
    this.patientId = patientId;
    this.allergies = allergies;
    this.medicationsInUse = medicationsInUse;
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

  public set patientId(patientId: number) {
    if (isNaN(patientId) || patientId <= 0) throw new Error("ID do paciente inválido.");
    this._patientId = patientId;
  }

  public set allergies(allergies: string[]) {
    const duplicates = allergies.filter((allergy, index) => allergies.indexOf(allergy) !== index);
    if (duplicates.length > 0) throw new Error("Alergias duplicadas.");

    const invalidAllergies = allergies.filter((allergy) => allergy.length < 3 || allergy.length > 100);
    if (invalidAllergies.length > 0) throw new Error("Alergias inválidas.");

    this._allergies = allergies;
  }

  public set medicationsInUse(medicationsInUse: string[]) {
    const duplicates = medicationsInUse.filter((medication, index) => medicationsInUse.indexOf(medication) !== index);
    if (duplicates.length > 0) throw new Error("Medicamentos duplicados.");

    const invalidMedications = medicationsInUse.filter((medication) => medication.length < 3 || medication.length > 100);
    if (invalidMedications.length > 0) throw new Error("Medicamentos inválidos.");

    this._medicationsInUse = medicationsInUse;
  }
}

abstract class Specialty {
  private _id: number = 0;
  private _name: string = "";

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }

  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public set name(name: string) {
    if (name.length < 3 || name.length > 100) throw new Error("Nome inválido.");
    this._name = name;
  }
}

class SurgicalSpecialty extends Specialty {
  private _surgeryType: string = "";

  constructor(id: number, name: string, surgeryType: string) {
    super(id, name);
    this.surgeryType = surgeryType;
  }

  public get surgeryType(): string { return this._surgeryType; }

  public set surgeryType(surgeryType: string) {
    if (surgeryType.length < 3 || surgeryType.length > 100) throw new Error("Tipo de cirurgia inválido.");
    this._surgeryType = surgeryType;
  }
}

class ClinicalSpecialty extends Specialty {
  private _clinicalArea: string = "";

  constructor(id: number, name: string, clinicalArea: string) {
    super(id, name);
    this.clinicalArea = clinicalArea;
  }

  public get clinicalArea(): string { return this._clinicalArea; }

  public set clinicalArea(clinicalArea: string) {
    if (clinicalArea.length < 3 || clinicalArea.length > 100) throw new Error("Área clínica inválida.");
    this._clinicalArea = clinicalArea;
  }
}

class Doctor extends Person {
  private _licenceNumber: string = "";
  private _specialtyId: number = 0;
  private _availableTimes: string[] = [];

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    licenceNumber: string,
    availableTimes: string[],
    specialtyId: number,
    userId: number,
  ) {
    super(id, name, birthDate, gender, cellphone, userId);
    this.licenceNumber = licenceNumber;
    this.availableTimes = availableTimes;
    this.specialtyId = specialtyId;
  }

  public get licenceNumber(): string { return this._licenceNumber; }
  public get specialtyId(): number { return this._specialtyId; }
  public get availableTimes(): string[] { return this._availableTimes; }

  public set licenceNumber(licenceNumber: string) {
    if (licenceNumber.length < 3 || licenceNumber.length > 100) throw new Error("Número de licença inválido.");
    this._licenceNumber = licenceNumber;
  }

  public set specialtyId(specialtyId: number) {
    if (isNaN(specialtyId) || specialtyId <= 0) throw new Error("ID da especialidade inválido.");
    this._specialtyId = specialtyId;
  }

  public set availableTimes(availableTimes: string[]) {
    const regex = /^\d{2}:\d{2}$/;
    const invalidTimes = availableTimes.filter((time) => !regex.test(time));
    if (invalidTimes.length > 0) throw new Error("Data inválida.");
    this._availableTimes = availableTimes;
  }
}

abstract class Appointment {
  private _id: number = 0;
  private _patientId: number = 0;
  private _doctorId: number = 0;
  private _date: Date = new Date();
  private _time: string = "";

  constructor(
    id: number,
    patientId: number,
    doctorId: number,
    date: string,
    time: string,
  ) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.time = time;
  }

  public abstract schedule(
    platform?: string,
    room?: string,
  ): void;

  public get id(): number { return this._id; }
  public get patientId(): number { return this._patientId; }
  public get doctorId(): number { return this._doctorId; }
  public get date(): Date { return this._date; }
  public get time(): string { return this._time; }

  public set id(id: number) {
    if (isNaN(id)) throw new Error("ID inválido.");
    if (id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public set patientId(patientId: number) {
    if (isNaN(patientId) || patientId <= 0) throw new Error("ID do paciente inválido.");
    this._patientId = patientId;
  }

  public set doctorId(doctorId: number) {
    if (isNaN(doctorId) || doctorId <= 0) throw new Error("ID do médico inválido.");
    this._doctorId = doctorId;
  }

  public set date(birthDate: string) {
    const regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!regex.test(birthDate.toString())) throw new Error("Data de nascimento inválida.");
    birthDate = birthDate.split("/").reverse().join("-");
    this._date = new Date(birthDate);
  }

  public set time(time: string) {
    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(time)) throw new Error("Hora inválida.");
    this._time = time;
  }
}

class VirtualAppointment extends Appointment {
  private _platform: string = "";

  constructor(
    id: number,
    platform: string,
    date: string,
    patientId: number,
    doctorId: number,
    time: string,
  ) {
    super(id, patientId, doctorId, date, time);
    this.schedule(platform, undefined);
  }

  public schedule(platform?: string, room?: string): void {
    if (platform === undefined) throw new Error("Plataforma inválida.");
    this.platform = platform;
  }

  public get platform(): string {
    return this._platform;
  }

  public set platform(platform: string) {
    if (platform.length < 3 || platform.length > 100) throw new Error("Plataforma inválida.");
    this._platform = platform;
  }
}

class PresentialAppointment extends Appointment {
  private _room: string = "";

  constructor(
    id: number,
    room: string,
    date: string,
    patientId: number,
    doctorId: number,
    time: string,
  ) {
    super(id, patientId, doctorId, date, time);
    this.schedule(undefined, room);
  }

  public schedule(platform?: string, room?: string): void {
    if (room === undefined) throw new Error("Sala inválida.");
    this.room = room;
  }

  public get room(): string {
    return this._room;
  }

  public set room(room: string) {
    if (room.length < 3 || room.length > 100) throw new Error("Sala inválida.");
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
  SurgicalSpecialty,
  Message,
};
