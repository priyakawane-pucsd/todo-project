
const Joi = require('joi');

const createTask = Joi.object({
    task_name: Joi.string().required(),
    status: Joi.string()
});

const getTaskById = Joi.object({
    id: Joi.string().required(),
});

const updateTask = Joi.object({
    id: Joi.string().required(),
    task_name: Joi.string(),
    status: Joi.string()
});

const deleteTask = Joi.object({
    id: Joi.string().required(),
});
module.exports = { createTask, getTaskById, updateTask, deleteTask };