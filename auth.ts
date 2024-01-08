import { waitUser } from "./utils";
import { showPatientsScreen } from "./patients";
import { showAdministratorsScreen } from "./administrators";
import { showDoctorsScreen } from "./doctors";
import { UserController, PatientController, AdministratorController, DoctorController } from "./controllers";
import { tryAgain } from "./utils";

import readLine from "readline-sync";

function login() {
  console.clear();
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
    return;
  }

  const doctor = DoctorController.getByUserId(user.id);
  if (doctor) {
    showDoctorsScreen(doctor);
    return;
  }

  const admin = AdministratorController.getByUserId(user.id);
  if (admin) {
    showAdministratorsScreen(admin);
    return;
  }
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
    else if (!tryAgain()) break;
  } while (true);
}

export { login, register };
