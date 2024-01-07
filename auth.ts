import db from "./database";
import { Administrator, Doctor, Patient, User } from "./models";
import { waitUser } from "./utils";
import { showPatientsScreen } from "./patients";

import readLine from "readline-sync";

function login() {
  const email = readLine.question("Digite seu email:");
  const password = readLine.question("Digite sua senha:");

  const user: User | undefined = db.users.find((user: User) => user.email === email && user.password === password);

  if (!user) {
    console.log("Email ou senha incorretos");
    waitUser();
    return;
  }

  const patient = db.patients.find((patient: Patient) => patient.userId === user.id);
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
    const email = readLine.question("Digite seu email:");
    const existentUser: User | undefined = db.users.find((user: User) => user.email === email);

    if (existentUser) {
      console.log("Email já cadastrado");
      return;
    }

    try {
      const password = readLine.question("Digite sua senha:");
      const name = readLine.question("Digite seu nome:");
      const birthDate = readLine.question("Digite sua data de nascimento:");
      const gender = readLine.question("Digite seu gênero:");
      const cellphone = readLine.question("Digite seu celular:");
      const healthInsurance = readLine.question("Digite seu plano de saúde:");
      const address = readLine.question("Digite seu endereço:");

      const newUserId = db.users.length + 1;
      const newUser = new User(newUserId, email, password);
      
      const newPatientId = db.patients.length + 1;
      const patient = new Patient(newPatientId, name, birthDate, gender, cellphone, healthInsurance, address, newUser.id);
      
      db.users.push(newUser);
      db.patients.push(patient);
      console.log("Usuário cadastrado com sucesso");
      break;
    } catch (error: any) {
      console.log("Ocorreu um erro: " + error.message);
      waitUser();
      continue;
    }
  }
  while (true);
}

export { login, register };
