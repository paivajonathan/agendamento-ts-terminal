import db from "../database";

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

    allergies = allergies.filter((allergy) => allergy !== "");

    this._allergies = allergies;
  }

  public set medicationsInUse(medicationsInUse: string[]) {
    const duplicates = medicationsInUse.filter((medication, index) => medicationsInUse.indexOf(medication) !== index);
    if (duplicates.length > 0) throw new Error("Medicamentos duplicados.");

    const invalidMedications = medicationsInUse.filter((medication) => medication.length > 100);
    if (invalidMedications.length > 0) throw new Error("Medicamentos inválidos.");

    medicationsInUse = medicationsInUse.filter((medication) => medication !== "");

    this._medicationsInUse = medicationsInUse;
  }

  public set comorbidities(comorbidities: string[]) {
    const duplicates = comorbidities.filter((comorbidity, index) => comorbidities.indexOf(comorbidity) !== index);
    if (duplicates.length > 0) throw new Error("Comorbidades duplicadas.");

    const invalidComorbidities = comorbidities.filter((comorbidity) => comorbidity.length > 100);
    if (invalidComorbidities.length > 0) throw new Error("Comorbidades inválidas.");

    comorbidities = comorbidities.filter((comorbidity) => comorbidity !== "");

    this._comorbidities = comorbidities;
  }

  public toString(): string {
    return `Id: ${this.id}, Alergias: ${this.allergies.length ? this.allergies : "Nenhuma"}, Medicações em uso: ${this.medicationsInUse.length ? this.medicationsInUse : "Nenhuma"}, Comorbidades: ${this.comorbidities.length ? this.comorbidities : "Nenhuma"}`;
  }

  public static getAll(): History[] {
    return db.histories;
  }
}

export default History;