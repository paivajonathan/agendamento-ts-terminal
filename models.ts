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
    if (db.users.find((user: User) => user.email === email)) throw new Error("Email já cadastrado.");
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

  public static create(email: string, password: string): User {
    const newUser = new User(
      db.users.length + 1,
      email,
      password,
    );
    db.users.push(newUser);
    return newUser;
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

class History {
  private _id: number = 0;
  private _allergies: string[] = [];
  private _medicationsInUse: string[] = [];
  private _comorbidities: string[] = [];
  private _patientId: number = 0;

  constructor(
    id: number,
    allergies: string[],
    medicationsInUse: string[],
    comorbidities: string[],
    patientId: number,
  ) {
    this.id = id;
    this.patientId = patientId;
    this.allergies = allergies;
    this.medicationsInUse = medicationsInUse;
    this.comorbidities = comorbidities;
  }

  public get id(): number {
    return this._id;
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

  public get comorbidities(): string[] {
    return this._comorbidities;
  }

  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public set patientId(patientId: number) {
    if (isNaN(patientId) || patientId <= 0) throw new Error("ID do paciente inválido.");
    this._patientId = patientId;
  }

  public set allergies(allergies: string[]) {
    const duplicates = allergies.filter((allergy, index) => allergies.indexOf(allergy) !== index);
    if (duplicates.length > 0) throw new Error("Alergias duplicadas.");

    const invalidAllergies = allergies.filter((allergy) => allergy.length > 100);
    if (invalidAllergies.length > 0) throw new Error("Alergias inválidas.");

    this._allergies = allergies;
  }

  public set medicationsInUse(medicationsInUse: string[]) {
    const duplicates = medicationsInUse.filter((medication, index) => medicationsInUse.indexOf(medication) !== index);
    if (duplicates.length > 0) throw new Error("Medicamentos duplicados.");

    const invalidMedications = medicationsInUse.filter((medication) => medication.length > 100);
    if (invalidMedications.length > 0) throw new Error("Medicamentos inválidos.");

    this._medicationsInUse = medicationsInUse;
  }

  public set comorbidities(comorbidities: string[]) {
    const duplicates = comorbidities.filter((comorbidity, index) => comorbidities.indexOf(comorbidity) !== index);
    if (duplicates.length > 0) throw new Error("Comorbidades duplicadas.");

    const invalidComorbidities = comorbidities.filter((comorbidity) => comorbidity.length > 100);
    if (invalidComorbidities.length > 0) throw new Error("Comorbidades inválidas.");

    this._comorbidities = comorbidities;
  }

  public static create(
    allergies: string[],
    medicationsInUse: string[],
    comorbidities: string[],
    patientId: number,
  ): History {
    const history = new History(
      db.histories.length + 1,
      allergies,
      medicationsInUse,
      comorbidities,
      patientId,
    );
    db.histories.push(history);
    return history;
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

  public toString(): string {
    return `${this.id} - ${this.name}`;
  }

  public static getAll(): Specialty[] {
    return db.specialties;
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

  public toString(): string {
    return `${super.toString()} - ${this.surgeryType}`;
  }

  public static create(name: string, surgeryType: string): void {
    const specialty = new SurgicalSpecialty(
      db.specialties.length + 1,
      name,
      surgeryType,
    );
    db.specialties.push(specialty);
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

  public toString(): string {
    return `${super.toString()} - ${this.clinicalArea}`;
  }

  public static create(name: string, clinicalArea: string): void {
    const specialty = new ClinicalSpecialty(
      db.specialties.length + 1,
      name,
      clinicalArea,
    );
    db.specialties.push(specialty);
  }
}

class Doctor extends Person {
  private _licenceNumber: string = "";
  private _specialtyId: number = 0;
  private _platformRoom: string = "";
  private _appointmentType: string = "";
  private _availableTimes: string[] = [];

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    licenceNumber: string,
    appointmentType: string,
    platformRoom: string,
    availableTimes: string[],
    specialtyId: number,
    userId: number,
  ) {
    super(id, name, birthDate, gender, cellphone, userId);
    this.licenceNumber = licenceNumber;
    this.availableTimes = availableTimes;
    this.specialtyId = specialtyId;
    this.platformRoom = platformRoom;
    this.appointmentType = appointmentType;
  }

  public get licenceNumber(): string { return this._licenceNumber; }
  public get specialtyId(): number { return this._specialtyId; }
  public get availableTimes(): string[] { return this._availableTimes; }
  public get platformRoom(): string { return this._platformRoom; }
  public get appointmentType(): string { return this._appointmentType; }

  public set appointmentType(appointmentType: string) {
    if (appointmentType.length < 3 || appointmentType.length > 100) throw new Error("Tipo de consulta inválido.");
    if (appointmentType !== "presential" && appointmentType !== "virtual") throw new Error("Tipo de consulta inválido.");
    this._appointmentType = appointmentType;
  }

  public set platformRoom(platformRoom: string) {
    if (platformRoom.length < 3 || platformRoom.length > 100) throw new Error("Plataforma ou sala inválida.");
    this._platformRoom = platformRoom;
  }

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

  public static getById(doctorId: number): Doctor {
    const doctor = db.doctors.find((doctor: Doctor) => doctor.id === doctorId);
    if (!doctor) throw new Error("Médico não encontrado.");
    return doctor;
  }

  public static create(
    email: string,
    password: string,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    licenceNumber: string,
    appointmentType: string,
    platformRoom: string,
    times: string[],
    specialtyId: number,
  ): Doctor {
    const user = User.create(email, password);
    const doctor = new Doctor(
      db.doctors.length + 1,
      name,
      birthDate,
      gender,
      cellphone,
      licenceNumber,
      appointmentType,
      platformRoom,
      times,
      specialtyId,
      user.id,
    );
    db.doctors.push(doctor);
    return doctor;
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

    const doctor = Doctor.getById(this.doctorId);
    const appointments = db.appointments.filter((appointment: Appointment) => appointment.doctorId === this.doctorId && appointment.date.toISOString() === this.date.toISOString());
    const availableTimes = doctor.availableTimes.filter((time: string) => !appointments.some((appointment: Appointment) => appointment.time === time));
    if (!availableTimes.includes(this.time)) throw new Error("Horário indisponível.");
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
    if (db.patients.find((patient: Patient) => patient.id === patientId) === undefined) throw new Error("Paciente não encontrado.");
    this._patientId = patientId;
  }

  public set doctorId(doctorId: number) {
    if (isNaN(doctorId) || doctorId <= 0) throw new Error("ID do médico inválido.");
    if (db.doctors.find((doctor: Doctor) => doctor.id === doctorId) === undefined) throw new Error("Médico não encontrado.");
    this._doctorId = doctorId;
  }

  public set date(birthDate: string) {
    const regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!regex.test(birthDate.toString())) throw new Error("Data inválida.");
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
    time: string,
    patientId: number,
    doctorId: number,
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

  public static create(platform: string, date: string, time: string, patientId: number, doctorId: number): void {
    const appointment = new VirtualAppointment(
      db.appointments.length + 1,
      platform,
      date,
      time,
      patientId,
      doctorId,
    );

    db.appointments.push(appointment);
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

  public static create(room: string, date: string, time: string, patientId: number, doctorId: number): void {
    const appointment = new PresentialAppointment(
      db.appointments.length + 1,
      room,
      date,
      patientId,
      doctorId,
      time,
    );

    db.appointments.push(appointment);
  }
}

export {
  Administrator,
  Appointment, ClinicalSpecialty, Doctor, History, Message, Patient, PresentialAppointment, Specialty, SurgicalSpecialty, User, VirtualAppointment
};

