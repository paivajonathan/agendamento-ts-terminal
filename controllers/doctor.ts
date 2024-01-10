import db from "../database/database";
import { Doctor, Message } from "../models/models";

class DoctorController {
  static getAll(): string[] {
    const doctors = Doctor.getAll();
    const toString = doctors.map((doctor: Doctor) => doctor.toString());
    return toString;
  }

  static getById(doctorId: number): Doctor | undefined {
    const doctor = db.doctors.find((doctor: Doctor) => doctor.id === doctorId);
    return doctor;
  }

  static getByUserId(userId: number): Doctor | undefined {
    const doctor = db.doctors.find((doctor: Doctor) => doctor.userId === userId);
    return doctor;
  }

  static register(
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
  ): Message {
    try {
      Doctor.create(
        email,
        password,
        name,
        birthDate,
        gender,
        cellphone,
        licenceNumber,
        serviceType,
        platformRoom,
        times,
        specialtyId,
      );
      return new Message(200, "Médico cadastrado com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar médico: ${error.message}`);
    }
  }
}

export default DoctorController;
