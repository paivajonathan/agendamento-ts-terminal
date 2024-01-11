import db from "../database/database";
import Person from "./person";
import User from "./user";

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
    serviceType: string,
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
    this.serviceType = serviceType;
  }

  public get licenceNumber(): string { return this._licenceNumber; }
  public get specialtyId(): number { return this._specialtyId; }
  public get availableTimes(): string[] { return this._availableTimes; }
  public get platformRoom(): string { return this._platformRoom; }
  public get serviceType(): string { return this._appointmentType; }

  public set serviceType(serviceType: string) {
    const options = ["presencial", "virtual"];
    if (serviceType.length < 3 || serviceType.length > 100) throw new Error("Tipo de atendimento inválido.");
    if (!options.includes(serviceType)) throw new Error("Tipo de atendimento inválido.");
    this._appointmentType = serviceType;
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
    if (invalidTimes.length > 0) throw new Error("Horário inválido.");
    this._availableTimes = availableTimes;
  }

  public toString(): string {
    return `${super.toString()}, Número de licença: ${this.licenceNumber}, Tipo de atendimento: ${this.serviceType}, Plataforma ou sala: ${this.platformRoom}, Horários disponíveis: ${this.availableTimes.join(", ")}`;
  }

  public static getAll(): Doctor[] {
    return db.doctors;
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
    serviceType: string,
    platformRoom: string,
    times: string[],
    specialtyId: number,
  ): Doctor {
    const user = new User(
      db.users.length + 1,
      email,
      password,
    )
    const doctor = new Doctor(
      db.doctors.length + 1,
      name,
      birthDate,
      gender,
      cellphone,
      licenceNumber,
      serviceType,
      platformRoom,
      times,
      specialtyId,
      user.id,
    );
    db.users.push(user);
    db.doctors.push(doctor);
    return doctor;
  }
}

export default Doctor;
