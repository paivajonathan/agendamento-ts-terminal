import { Message, Specialty, ClinicalSpecialty, SurgicalSpecialty } from "../models/models";

class SpecialtyController {
  static getAll(): string[] {
    const specialties = Specialty.getAll();
    const toString = specialties.map((specialty: Specialty) => specialty.toString());
    return toString;
  }

  static registerClinical(name: string, area: string): Message {
    try {
      ClinicalSpecialty.create(name, area);
      return new Message(200, "Especialidade cadastrada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar especialidade: ${error.message}`);
    }
  }

  static registerSurgical(name: string, surgeryType: string): Message {
    try {
      SurgicalSpecialty.create(name, surgeryType);
      return new Message(200, "Especialidade cadastrada com sucesso!");
    } catch (error: any) {
      return new Message(422, `Ocorreu um erro ao cadastrar especialidade: ${error.message}`);
    }
  }
}

export default SpecialtyController;
