import db from "../database/database";

class User {
  private _id: number = 0;
  private _email: string = "";
  private _password: string = "";

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  public get email(): string { return this._email; }
  public get password(): string { return this._password; }
  public get id(): number { return this._id; }
  public set email(email: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(email)) throw new Error("Email inválido.");
    if (db.users.find((user: User) => user.email === email)) throw new Error("Email já cadastrado.");
    this._email = email;
  }
  public set password(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    if (!regex.test(password)) throw new Error("Senha inválida.");
    this._password = password;
  }
  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public toString(): string {
    return `ID: ${this.id}, Email: ${this.email}`;
  }

  public static getAll(): User[] {
    return db.users;
  }
}

export default User;