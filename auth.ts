import { waitUser } from "./utils";
import { showPatientsScreen } from "./patients";
import { showAdministratorsScreen } from "./administrators";
import { showDoctorsScreen } from "./doctors";
import { UserController, PatientController, AdministratorController, DoctorController } from "./controllers";
import { continueTyping } from "./utils";

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
    const password = readLine.question("Digite sua senha: ");
    const name = readLine.question("Digite seu nome: ");
    const birthDate = readLine.question("Digite sua data de nascimento: ");
    const gender = readLine.question("Digite seu gênero: ");
    const cellphone = readLine.question("Digite seu celular: ");
    const healthInsurance = readLine.question("Digite seu plano de saúde: ");
    const address = readLine.question("Digite seu endereço: ");
    const allergies: string[] = [];
    while (true) {
      let allergy: string = readLine.question("Digite uma alergia: ");
      allergies.push(allergy);
      if (!continueTyping("Deseja adicionar outra alergia? (s/n) ")) break;
    }
    const medications: string[] = [];
    while (true) {
      let medication: string = readLine.question("Digite um medicamento: ");
      medications.push(medication);
      if (!continueTyping("Deseja adicionar outro medicamento? (s/n) ")) break;
    }
    const comorbidities: string[] = [];
    while (true) {
      let comorbidity: string = readLine.question("Digite uma comorbidade: ");
      comorbidities.push(comorbidity);
      if (!continueTyping("Deseja adicionar outra comorbidade? (s/n) ")) break;
    }

    const registered = PatientController.register(
      email,
      password,
      name,
      birthDate,
      gender,
      cellphone,
      healthInsurance,
      address,
      allergies,
      medications,
      comorbidities,
    );

    console.log(registered.message);
    waitUser();

    if (registered.status === 200) break;
    else if (!continueTyping()) break;
  } while (true);
}

export { login, register };
