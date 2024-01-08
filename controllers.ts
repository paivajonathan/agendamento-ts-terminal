import db from './database';
import { User, Patient } from './models';

class UserController {
    static authenticate(email: string, password: string): User | undefined {
        const user = db.users.find((user: User) => user.email === email && user.password === password);
        return user;
    }

    static getByEmail(email: string): User | undefined {
        const user = db.users.find((user: User) => user.email === email);
        return user;
    }
}

class PatientController {
    static getPatientByUserId(userId: number): Patient | undefined {
        const patient = db.patients.find((patient: Patient) => patient.userId === userId);
        return patient;
    }

    static register(email: string, password: string, name: string, birthDate: string, gender: string, cellphone: string, healthInsurance: string, address: string): object {
        try {
            const newUserId = db.users.length + 1;
            const newUser = new User(newUserId, email, password);
            
            const newPatientId = db.patients.length + 1;
            const patient = new Patient(newPatientId, name, birthDate, gender, cellphone, healthInsurance, address, newUser.id);
            
            db.users.push(newUser);
            db.patients.push(patient);

            return { status: 200, message: "Paciente cadastrado com sucesso!" };
        } catch (error: any) {
            return { status: 422, message: `Ocorreu um erro ao cadastrar paciente: ${error.message}` };
        }
    }
}

export { UserController, PatientController };