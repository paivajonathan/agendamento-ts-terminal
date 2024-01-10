import db from "../database";

abstract class Specialty {
  private _id: number = 0;
  private _name: string = "";

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }

  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public set name(name: string) {
    if (name.length < 3 || name.length > 100) throw new Error("Nome inválido.");
    this._name = name;
  }

  public toString(): string {
    return `${this.id} - ${this.name}`;
  }

  public static getAll(): Specialty[] {
    return db.specialties;
  }
}

export default Specialty;