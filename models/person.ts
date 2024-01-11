
class Person {
  private _id: number = 0;
  private _name: string = "";
  private _birthDate: string = "";
  private _gender: string = "";
  private _cellphone: string = "";
  private _userId: number = 0;

  constructor(
    id: number,
    name: string,
    birthDate: string,
    gender: string,
    cellphone: string,
    userId: number,
  ) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.gender = gender;
    this.cellphone = cellphone;
    this.userId = userId;
  }

  public get id(): number { return this._id; }
  public get name(): string { return this._name; }
  public get birthDate(): string { return this._birthDate; }
  public get gender(): string { return this._gender; }
  public get cellphone(): string { return this._cellphone; }
  public get userId(): number { return this._userId; }

  public set id(id: number) {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido.");
    this._id = id;
  }

  public set name(name: string) {
    if (name.length < 3 || name.length > 100) throw new Error("Nome inválido.");
    this._name = name;
  }

  public set birthDate(birthDate: string) {
    const regex = /^\d{2}([./-])\d{2}\1\d{4}$/;
    if (!regex.test(birthDate.toString())) throw new Error("Data de nascimento inválida.");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(birthDate.split("/").reverse().join("-"));
    if (date >= today) throw new Error("Data de nascimento inválida.");
    this._birthDate = birthDate;
  }

  public set gender(gender: string) {
    const options = ["M", "F", "O"];
    if (!(options.includes(gender))) throw new Error("Gênero inválido.");
    this._gender = gender;
  }

  public set cellphone(cellphone: string) {
    const regex = /^(\d{2})?(\d{9})$/;
    if (!regex.test(cellphone)) throw new Error("Número de celular inválido.");
    this._cellphone = cellphone;
  }

  public set userId(userId: number) {
    if (isNaN(userId) || userId <= 0) throw new Error("ID de usuário inválido.");
    this._userId = userId;
  }

  public toString(): string {
    return `Id: ${this.id}, Nome: ${this.name}, Data de nascimento: ${this.birthDate}, Sexo: ${this.gender}, Celular: ${this.cellphone}`;
  }
}

export default Person;