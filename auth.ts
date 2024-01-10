import { waitUser } from "./utils";
import { showPatientsScreen } from "./patients";
import { showAdministratorsScreen } from "./administrators";
import { showDoctorsScreen } from "./doctors";
import { UserController, PatientController, AdministratorController, DoctorController } from "./controllers";
import { continueTyping, getPersonData } from "./utils";

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

    const [email, password, name, birthDate, gender, cellphone] = getPersonData();
    const healthInsurance = readLine.question("Digite seu plano de saúde:\n> ");
    const address = readLine.question("Digite seu endereço:\n> ");

    const allergies: string[] = [];
    while (true) {
      let allergy: string = readLine.question("Digite uma alergia (ou deixe em branco para sair):\n> ");
      allergies.push(allergy);
      if (!continueTyping("Deseja adicionar outra alergia? (s/n)\n> ")) break;
    }

    const medications: string[] = [];
    while (true) {
      let medication: string = readLine.question("Digite um medicamento (ou deixe em branco para sair):\n> ");
      medications.push(medication);
      if (!continueTyping("Deseja adicionar outro medicamento? (s/n)\n> ")) break;
    }

    const comorbidities: string[] = [];
    while (true) {
      let comorbidity: string = readLine.question("Digite uma comorbidade (ou deixe em branco para sair):\n> ");
      comorbidities.push(comorbidity);
      if (!continueTyping("Deseja adicionar outra comorbidade? (s/n)\n> ")) break;
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
