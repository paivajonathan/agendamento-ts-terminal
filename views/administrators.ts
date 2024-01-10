import readLine from "readline-sync";
import { DoctorController, SpecialtyController } from "../controllers/controllers";
import { Administrator } from "../models/models";
import { continueTyping, formatString, getPersonData, waitUser } from "../utils";

class AdministratorView {
  private static showMenu(name: string): void {
    console.clear();
    console.log(`=========== Bem vindo(a) ${name} ===========`);
    console.log("1 - Cadastrar médico");
    console.log("2 - Listar médicos");
    console.log("3 - Cadastrar especialidade");
    console.log("4 - Listar especialidades");
    console.log("5 - Deslogar");
  }

  private static registerDoctor(): void {
    do {
      console.clear();

      const [email, password, name, birthDate, gender, cellphone] = getPersonData();
      const licenceNumber = readLine.question("Digite o CRM:\n> ");
      const serviceType = readLine.question("Digite o tipo de atendimento (presencial ou virtual):\n> ");
      const platformRoom = readLine.question("Digite a sala ou plataforma:\n> ");

      const times: string[] = [];
      while (true) {
        let time: string = readLine.question("Digite um horário de atendimento (hh:mm):\n> ");
        times.push(time);
        if (!continueTyping("Deseja adicionar outro horário? (s/n)\n> ")) break;
      }

      const specialtyId = Number(readLine.question("Digite o ID da especialidade:\n> "));

      const registered = DoctorController.register(
        email,
        password,
        name,
        birthDate,
        gender,
        cellphone,
        licenceNumber,
        serviceType,
        platformRoom,
        times,
        specialtyId,
      );

      console.log(registered.message);
      waitUser();

      if (registered.status === 200) break;
      else if (!continueTyping()) break;
    } while (true);
  }

  private static listDoctors(): void {
    console.clear();
    const doctors = DoctorController.getAll();
    if (!doctors.length) {
      console.log("Nenhum médico cadastrado");
      waitUser();
      return;
    }
    console.log("Médicos cadastrados:");
    console.table(doctors);
    waitUser();
  }

  private static registerSpecialty(): void {
    let registered: any = {};

    do {
      console.clear();

      const name = readLine.question("Digite o nome da especialidade: ");
      const type = readLine.question("Digite o tipo da especialidade: ");

      if (formatString(type) === "clinica") {
        const area = readLine.question("Digite a área da especialidade: ");
        registered = SpecialtyController.registerClinical(name, area);

      } else if (formatString(type) === "cirurgica") {
        const surgeryType = readLine.question("Digite a especialidade cirúrgica: ");
        registered = SpecialtyController.registerSurgical(name, surgeryType);

      } else {
        console.log("Tipo de especialidade inválido");
        waitUser();

        if (!continueTyping()) break;
        continue;
      }

      console.log(registered.message);
      waitUser();

      if (registered.status === 200) break;
      else if (!continueTyping()) break;

    } while (true);
  }

  private static listSpecialties(): void {
    console.clear();
    const specialties = SpecialtyController.getAll();
    if (!specialties.length) {
      console.log("Nenhuma especialidade cadastrada");
      waitUser();
      return;
    }
    console.log("Especialidades cadastradas:");
    specialties.forEach((specialty: string) => console.log(specialty));
    waitUser();
  }

  public static showAdministratorsScreen(administrator: Administrator) {
    let option: number = 0;

    do {
      AdministratorView.showMenu(administrator.name);
      option = parseInt(readLine.question("> "));
      switch (option) {
        case 1:
          AdministratorView.registerDoctor();
          break;
        case 2:
          AdministratorView.listDoctors();
          break;
        case 3:
          AdministratorView.registerSpecialty();
          break;
        case 4:
          AdministratorView.listSpecialties();
          break;
        case 5:
          console.log("Deslogando...");
          waitUser();
          return;
        default:
          console.log("Opção inválida");
          break;
      }
    } while (option !== 5);
  }
}

export default AdministratorView;
