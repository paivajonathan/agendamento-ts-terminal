import { Administrator } from '../models/models';

class AdministratorController {
  static getByUserId(userId: number): Administrator | undefined {
    const administrator = Administrator.getAll().find((administrator: Administrator) => administrator.userId === userId);
    return administrator;
  }
}

export default AdministratorController;
