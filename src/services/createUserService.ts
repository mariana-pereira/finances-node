import { getRepository } from 'typeorm';

import User from '@models/User';

interface Request {
  name: string;
  email: string;
  password_hash: string;
}

class CreateUserService {
  public async execute({ name, email, password_hash }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const user = usersRepository.create({
      name,
      email,
      password_hash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;