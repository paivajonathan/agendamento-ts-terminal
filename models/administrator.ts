import Person from "./person";
import db from "../database/database";

class Administrator extends Person {
  private _role: string = "";

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    role: string,
    userId: number,
  ) {
    super(id, name, birthDate, gender, cellphone, userId);
    this.role = role;
  }

  public get role(): string { return this._role; }

  public set role(role: string) {
    if (role.length < 3 || role.length > 100) throw new Error("Cargo inválido.");
    this._role = role;
  }

  public toString(): string {
    return `${super.toString()}, Cargo: ${this.role}`;
  }

  public static getAll(): Administrator[] {
    return db.administrators;
  }
}

export default Administrator;
