import { Message, Patient } from "../models/models";

class PatientController {
  static getAll(): string[] {
    const patients = Patient.getAll();
    const toString = patients.map((patient: Patient) => patient.toString());
    return toString;
  }

  static getByUserId(userId: number): Patient | undefined {
    const patient = Patient.getAll().find((patient: Patient) => patient.userId === userId);
    return patient;
  }

  static register(
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
  ): Message {
    try {
      Patient.create(
        email,
        password,
        name,
        birthDate,
        gender,
        cellphone,
        healthInsurance,
        address,
        allergies,
        medications,
        comorbities,
      );
      return new Message(200, "Paciente cadastrado com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar paciente: ${error.message}`);
    }
  }
}

export default PatientController;
