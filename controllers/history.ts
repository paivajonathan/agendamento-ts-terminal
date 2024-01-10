import { DataMessage, Patient, History } from "../models/models";

class HistoryController {
  static getByPatientId(patientId: number): DataMessage {
    try {
      const patient = Patient.getById(patientId);
      const history = History.getAll().filter((history: History) => history.patientId === patient.id)[0];
      return new DataMessage(200, "Histórico encontrado com sucesso!", history.toString());
    } catch (error: any) {
      return new DataMessage(422, `Ocorreu um erro ao buscar histórico: ${error.message}`, "");
    }
  }
}

export default HistoryController;
