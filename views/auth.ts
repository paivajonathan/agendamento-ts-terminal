import {
  AdministratorController,
  DoctorController,
  PatientController,
  UserController,
} from "../controllers/controllers";
import {
  continueTyping,
  getPersonData,
  waitUser,
} from "../utils";
import AdministratorView from "./administrator";
import DoctorView from "./doctor";
import PatientView from "./patient";

import readLine from "readline-sync";

class AuthView {
  public static login() {
    console.clear();

    const email = readLine.question("Digite seu email: ");
    const password = readLine.question("Digite sua senha: ");
    const user = UserController.authenticate(email, password);

    if (!user) {
      console.log("Email ou senha incorretos");
      waitUser();
      return;
    }

    const patient = PatientController.getByUserId(user.id);
    if (patient) {
      PatientView.showScreen(patient);
      return;
    }

    const doctor = DoctorController.getByUserId(user.id);
    if (doctor) {
      DoctorView.showScreen(doctor);
      return;
    }

    const admin = AdministratorController.getByUserId(user.id);
    if (admin) {
      AdministratorView.showScreen(admin);
      return;
    }
  }

  public static register(): void {
    do {
      console.clear();

      const [email, password, name, birthDate, gender, cellphone] = getPersonData();
      const healthInsurance = readLine.question("Digite seu plano de saúde (ou deixe em branco para nenhum):\n> ");
      const address = readLine.question("Digite seu endereço:\n> ");

      const allergies: string[] = [];
      while (true) {
        let allergy: string = readLine.question("Digite uma alergia (ou deixe em branco para sair):\n> ");
        if (allergy.trim() === "") break;
        allergies.push(allergy);
      }

      const medications: string[] = [];
      while (true) {
        let medication: string = readLine.question("Digite um medicamento (ou deixe em branco para sair):\n> ");
        if (medication.trim() === "") break;
        medications.push(medication);
      }

      const comorbidities: string[] = [];
      while (true) {
        let comorbidity: string = readLine.question("Digite uma comorbidade (ou deixe em branco para sair):\n> ");
        if (comorbidity.trim() === "") break;
        comorbidities.push(comorbidity);
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
}

export default AuthView;
