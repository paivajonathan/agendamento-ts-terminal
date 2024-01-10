import db from "../database/database";
import Appointment from "./appointment";

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
    super.schedule(undefined, undefined);
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

  public toString(): string {
    return `${super.toString()}, Sala: ${this.room}`;
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

export default PresentialAppointment;
