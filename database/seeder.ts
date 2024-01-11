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
    new User(1, "paciente@gmail.com", "Paciente@123"),
    new User(2, "medico@gmail.com", "Medico@123"),
    new User(3, "admin@gmail.com", "Admin@123"),
    new User(4, "doctorwho@gmail.com", "Doctor@123"),
  );
  db.patients.push(
    new Patient(
      1,
      "Paciente",
      "01/01/2000",
      "M",
      "92993593795",
      "Unimed",
      "Rua Joaquim Lopes Gonçalves, Uraim III, Paragominas, PA",
      1,
    ),
  );
  db.doctors.push(
    new Doctor(
      1,
      "Médico",
      "05/07/1975",
      "M",
      "86969665544",
      "CRM/PI 123456",
      "virtual",
      "Zoom",
      ["10:00", "12:00"],
      1,
      2,
    ),
    new Doctor(
      2,
      "Doctor Who",
      "09/10/1969",
      "M",
      "27983910844",
      "CRM/ES 654321",
      "presencial",
      "Sala 1",
      ["18:00", "21:00"],
      1,
      4,
    ),
  );
  db.administrators.push(
    new Administrator(
      1,
      "Admin",
      "10/07/1995",
      "F",
      "84983762515",
      "Administração",
      3,
    ),
  );
  db.appointments.push(
    new VirtualAppointment(1, "Zoom", "01/02/2024", "10:00", 1, 1),
  );
  db.histories.push(
    new History(
      1,
      ["Pólen", "Frutos do Mar", "Soja"],
      ["Clopidogrel", "Carvedilol", "Esomeprazol"],
      ["Hipertensão Arterial", "Obesidade"],
      1,
    ),
  );
  db.specialties.push(
    new ClinicalSpecialty(1, "Cardiologia", "Doenças Cardíacas"),
    new ClinicalSpecialty(2, "Pneumologia", "Doenças Respiratórias"),
    new SurgicalSpecialty(3, "Cirurgia Geral", "Procedimentos Cirúrgicos Diversos"),
    new SurgicalSpecialty(4, "Neurocirurgia", "Sistema Nervoso Central e Periférico"),
  );
}

export default seedDatabase;
