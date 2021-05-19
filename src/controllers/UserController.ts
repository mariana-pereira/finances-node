import { Request, Response } from 'express';

import UserService from '../services/createUserService';

class UserController {
  public async store (request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password_hash } = request.body;

      const createUser = new UserService();

      const user = await createUser.execute({
        name,
        email,
        password_hash,
      });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
