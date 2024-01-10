import db from '../database';
import { Administrator } from '../models/models';

class AdministratorController {
  static getAll(): Administrator[] {
    return db.administrators;
  }

  static getById(administratorId: number): Administrator | undefined {
    const administrator = db.administrators.find((administrator: Administrator) => administrator.id === administratorId);
    return administrator;
  }

  static getByUserId(userId: number): Administrator | undefined {
    const administrator = db.administrators.find((administrator: Administrator) => administrator.userId === userId);
    return administrator;
  }
}

export default AdministratorController;
