import db from "../database/database";
import Specialty from "./specialty";

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

export default ClinicalSpecialty;
