const express = require('express');

const route = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

const OngsController = require('./controllers/OngsControllers');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

route.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  SessionController.create
);

route.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().length(2).required(),
    }),
  }),
  OngsController.store
);
route.get('/ongs', OngsController.index);
route.get(
  '/incident',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentsController.index
);
route.post(
  '/incident',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().length(8).required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
  }),
  IncidentsController.store
);
route.delete(
  '/incident/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().length(8).required(),
    }).unknown(),
  }),
  IncidentsController.delete
);
route.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().length(8).required(),
    }).unknown(),
  }),
  ProfileController.index
);

module.exports = route;
