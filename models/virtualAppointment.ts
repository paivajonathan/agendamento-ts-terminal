import db from "../database/database";
import Appointment from "./appointment";

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
    this.schedule(platform);
  }

  public schedule(platformRoom?: string): void {
    super.schedule();
    if (platformRoom === undefined) throw new Error("Plataforma inválida.");
    this.platform = platformRoom;
  }

  public get platform(): string {
    return this._platform;
  }

  public set platform(platform: string) {
    if (platform.length < 3 || platform.length > 100) throw new Error("Plataforma inválida.");
    this._platform = platform;
  }

  public toString(): string {
    return `${super.toString()}, Plataforma: ${this.platform}`;
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

export default VirtualAppointment;
