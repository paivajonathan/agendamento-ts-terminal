import { User } from '../models/models';

class UserController {
  static authenticate(email: string, password: string): User | undefined {
    const user = User.getAll().find((user: User) => user.email === email && user.password === password);
    return user;
  }
}

export default UserController;
