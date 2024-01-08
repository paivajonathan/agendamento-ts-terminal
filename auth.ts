import db from "./database";
import { Administrator, Doctor, Patient, User } from "./models";
import { waitUser } from "./utils";
import { showPatientsScreen } from "./patients";
import { UserController, PatientController } from "./controllers";

import readLine from "readline-sync";

function login() {
  const email = readLine.question("Digite seu email: ");
  const password = readLine.question("Digite sua senha: ");

  const user = UserController.authenticate(email, password);

  if (!user) {
    console.log("Email ou senha incorretos");
    waitUser();
    return;
  }

  const patient = PatientController.getPatientByUserId(user.id);
  if (patient) {
    showPatientsScreen(patient);
  }

  // const doctor = db.doctors.find((doctor: Doctor) => doctor.userId === user.id);
  // if (doctor) {
  //   doctorsScreen(doctor);
  // }

  // const admin = db.admins.find((admin: Administrator) => admin.userId === user.id);
  // if (admin) {
  //   adminsScreen(admin);
  // }
}

function register(): void {
  do {
    console.clear();
    const email = readLine.question("Digite seu email: ");
    const existentUser = UserController.getByEmail(email);

    if (existentUser) {
      console.log("Email já cadastrado");
      waitUser();
      return;
    }

    const password = readLine.question("Digite sua senha: ");
    const name = readLine.question("Digite seu nome: ");
    const birthDate = readLine.question("Digite sua data de nascimento: ");
    const gender = readLine.question("Digite seu gênero: ");
    const cellphone = readLine.question("Digite seu celular: ");
    const healthInsurance = readLine.question("Digite seu plano de saúde: ");
    const address = readLine.question("Digite seu endereço: ");

    const registered: any = PatientController.register(email, password, name, birthDate, gender, cellphone, healthInsurance, address);
    console.log(registered.message);
    waitUser();
    if (registered.status === 200) break;
  } while (true);
}

export { login, register };
