import { Model } from 'mongoose';
import { CreateUserDto } from 'src/validator/create-user.dto';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

describe('UserController', () => {
  let userModel: Model<User>;
  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    userService = new UserService(userModel);
    userController = new UserController(userService);
  });

  it('should successfully getUser with correct params provided', async () => {
    const result: Partial<IUser> = {
      name: 'Kadek Pradnyana',
    };

    jest
      .spyOn(userService, 'findOne')
      .mockImplementation(() => Promise.resolve(result as UserDocument));

    expect(await userController.getUser({ username: 'username' })).toBe(result);
  });

  it('should successfully createUser with correct params provided', async () => {
    const userInput: CreateUserDto = {
      name: 'Kadek Pradnyana',
      username: 'kadekpradnyana',
      email: 'kadek@pradnyana.com',
      password: '123as',
      phone: '08123923',
    };

    const result: Partial<IUser> = {
      name: 'Kadek Pradnyana',
    };

    jest
      .spyOn(userService, 'createUser')
      .mockImplementation(() => Promise.resolve(result as UserDocument));

    expect(await userController.createUser(userInput)).toBe(result);
  });
});
