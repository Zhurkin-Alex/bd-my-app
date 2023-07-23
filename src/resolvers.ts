// src/resolvers.ts
import User from './models/User';

const resolvers = {
  async getUser({ id }: { id: string }) {
    return await User.findById(id);
  },

  async getAllUsers() {
    return await User.find();
  },

  async createUser({ name, email }: { name: string; email: string }) {
    // Проверяем, существует ли пользователь с указанным email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Если пользователь существует, возвращаем его
      return existingUser;
    } else {
      // Если пользователь не существует, создаем нового пользователя в базе данных
      const user = new User({ name, email });
      return await user.save();
    }
  },

  async deleteUser({ id }: { id: string }) {
    return await User.findByIdAndDelete(id);
  },
};

export default resolvers;
