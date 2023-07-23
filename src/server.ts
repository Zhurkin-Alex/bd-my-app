import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';
import resolvers from './resolvers';
import cors from 'cors';

const app = express();

app.use(cors());

// Замените <username>, <password>, <cluster-url> и <database-name> на значения из вашей строки подключения MongoDB Atlas
const dbURI = 'mongodb+srv://Alex:iwOJgHcG02ktln1H@cluster0.fg8oz.mongodb.net/';

// Подключение к базе данных MongoDB на MongoDB Atlas
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Другие параметры подключения, если необходимо
} as Parameters<typeof mongoose.connect>[1]) // Пометить параметры подключения как тип Parameters

  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Запуск вашего сервера или другой логики при успешном подключении к базе данных
    app.use('/graphql', graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true, // Включает GraphiQL - инструмент для тестирования запросов GraphQL
    }));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    // Здесь вы можете обработать ошибку подключения, если необходимо
  });



// const dbURI = 'mongodb+srv://Alex:iwOJgHcG02ktln1H@cluster0.fg8oz.mongodb.net/';
