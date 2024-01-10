import db from '../database/database';
import { User } from '../models/models';

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

export default UserController;