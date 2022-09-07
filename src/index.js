import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

export default fastify;

// Должен иметь роут /uppercase(POST) на который отправляя строку, возвращает её в uppercase со статусом 200. 
// Если строка содержит слово fuck(не зависит от регистра), роут должен вернуть 403 статус и строку unresolved

fastify.post('/uppercase', (request, reply) => {
  const text = request.body;
  if(text.toUpperCase().includes('FUCK')) {
    return reply.status(200).send(text);
  } reply.status(403).send('unresolved');
})

// Должен иметь роут /lowercase(POST) с абсолютно аналогичным функционалом, только строку в lowercase

fastify.post('/uppercase', (request, reply) => {
  const text = request.body;
  if(text.toLowerCase().includes('fuck')) {
    return reply.status(200).send(text);
  } reply.status(403).send('unresolved');
})

// Должен иметь роут /user/:id(GET) и должен вернуть объект с этим id, если его нет(например id нет в объекте) 
// тогда статус 400 и шлем строку User not exist

fastify.get('/user/:id', (request, reply) => {
  const id = request.params.id;
  if (users[id]) {
    return reply.send(users[id])
  } reply.status(400).send('User not exist');
})

// Должен иметь роут /users(GET) и они могут принять несколько query params, которые называются filter и value. 
// В фильтр ми отправляем строку, поле по которому мы будем фильтровать, а в value значение и роут должен вернуть 
// массив объектов соответвствующих этому фильтру. Если мы не передаем query params то тогда отправляем массив 
// объектов(без id, только те объекты что внутри)

fastify.get('/users', (request, reply) => {
  const {filter, value} = request.query;

  if (filter, value) {
    if (Object.values(users).filter((item) => item[filter] === value)) {
      return reply.send(users[item])
    } 
    reply.status(400).send('No match');
  }
  
  reply.send(Object.values(users));

})
