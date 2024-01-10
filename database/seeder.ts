import {
  Administrator,
  ClinicalSpecialty,
  Doctor,
  History,
  Patient,
  SurgicalSpecialty,
  User,
  VirtualAppointment,
} from "../models/models";
import db from "./database";

function seedDatabase() {
  db.users.push(
    new User(1, "teste@gmail.com", "Teste@123"),
    new User(2, "medico@gmail.com", "Medico@123"),
    new User(3, "admin@gmail.com", "Admin@123"),
    new User(4, "drauzio@gmail.com", "Drauzio@123"),
  );
  db.patients.push(
    new Patient(1, "João", "01/01/2000", "M", "86994717931", "Unimed", "Rua 1", 1),
  );
  db.doctors.push(
    new Doctor(1, "Médico", "01/01/2000", "M", "999999999", "123456", "virtual", "zoom", ["10:00", "12:00"], 1, 2,),
    new Doctor(2, "Drauzio", "01/01/2000", "M", "999999999", "123456", "virtual", "zoom", ["18:00"], 1, 4,),
  );
  db.administrators.push(
    new Administrator(1, "Admin", "01/01/2000", "F", "999999999", "Administração", 3),
  );
  db.appointments.push(
    new VirtualAppointment(1, "Zoom", "01/01/2000", "10:00", 1, 1),
  );
  db.histories.push(
    new History(1, [], [], [], 1),
  );
  db.specialties.push(
    new ClinicalSpecialty(1, "Cardiologia", "Cardiologista"),
    new SurgicalSpecialty(2, "Cirurgia Geral", "Cirurgião Geral"),
  );
}

export default seedDatabase;