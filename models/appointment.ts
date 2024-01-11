import db from "../database/database";
import Doctor from "./doctor";
import Patient from "./patient";

abstract class Appointment {
  private _id: number = 0;
  private _patientId: number = 0;
  private _doctorId: number = 0;
  private _date: string = "";
  private _time: string = "";
  private _status = "";

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
    this.status = "marcada";
  }

  public schedule(platform?: string, room?: string): void {
    const doctor = Doctor.getById(this.doctorId);
    const appointments = db.appointments.filter((appointment: Appointment) => appointment.doctorId === this.doctorId && appointment.date === this.date);
    const availableTimes = doctor.availableTimes.filter((time: string) => !appointments.some((appointment: Appointment) => appointment.time === time));
    if (!availableTimes.includes(this.time)) throw new Error("Horário indisponível.");
  }

  public confirm() {
    this.status = "confirmada";
  }

  public cancel() {
    this.status = "cancelada";
  }

  public get id(): number { return this._id; }
  public get patientId(): number { return this._patientId; }
  public get doctorId(): number { return this._doctorId; }
  public get date(): string { return this._date; }
  public get time(): string { return this._time; }
  public get status(): string { return this._status; }

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

  public set date(date: string) {
    const regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!regex.test(date.toString())) throw new Error("Data inválida.");
    const today = new Date();
    const [day, month, year] = date.split(/[./-]/);
    const appointmentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (appointmentDate < today) throw new Error("Data inválida, escolha uma data futura.");
    this._date = date;
  }

  public set time(time: string) {
    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(time)) throw new Error("Hora inválida.");
    this._time = time;
  }

  public set status(status: string) {
    const options: string[] = ["marcada", "confirmada", "cancelada"];
    if (status.length < 3 || status.length > 100 || !options.includes(status)) throw new Error("Status inválido.");
    if (this.status !== "marcada" && (status === "confirmada" || status === "cancelada")) throw new Error(`Esta consulta não pode ser ${status}, pois já está ${this.status}.`);
    this._status = status;
  }

  public toString(): string {
    const patient = Patient.getById(this.patientId);
    const doctor = Doctor.getById(this.doctorId);
    return `Id: ${this.id}, Paciente: ${patient.name}, Médico: ${doctor.name}, Data: ${this.date}, Horário: ${this.time}, Situação: ${this.status}`;
  }

  public static getAll(): Appointment[] {
    return db.appointments;
  }

  public static getById(appointmentId: number): Appointment {
    const appointment = db.appointments.find((appointment: Appointment) => appointment.id === appointmentId);
    if (!appointment) throw new Error("Consulta não encontrada.");
    return appointment;
  }
}

export default Appointment;
