const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');


//routes


router.get('/', getAll);
router.get('/:id', getbyId);
route.post('/', createSchema, create);
route.put('/:id', updateSchema, update);
router.delete('/:id',_delete);

// route functions

function getAll(req, resizeBy, next){
    userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getById(req,res,next){
    userService.getById(req.params.id)
    .then(users => res.json(users))
    .catch(next);
}

function create(req,res,next){
    userService.create(req.params.id)
    .then(users => res.json({message : 'User created' }))
    .catch(next);
}

function update(req,res,next){
    userService.update(req.params.id, req.body)
    .then(users => res.json({message : 'User updated' }))
    .catch(next);
}

function _delete(req,res,next){
    userService.delete(req.params.id)
    .then(users => res.json({message : 'User deleted' }))
    .catch(next);
}

//schema functions 

function createSchema(req,res,next){
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}