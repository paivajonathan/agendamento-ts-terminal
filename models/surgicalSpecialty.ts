import db from "../database";
import Specialty from "./specialty";

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

export default SurgicalSpecialty;
