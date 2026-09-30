const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const factory = require('../utils/crudFactory');
const Profile = require('../models/Profile');
const { getProfile, updateProfile } = require('../controllers/profileController');

const createCrudRouter = (Model) => {
  const router = express.Router();
  router.route('/')
    .get(factory.getAll(Model))
    .post(protect, factory.createOne(Model));
  
  router.route('/:id')
    .get(factory.getOne(Model))
    .put(protect, factory.updateOne(Model))
    .delete(protect, factory.deleteOne(Model));
    
  return router;
};

module.exports = { createCrudRouter };

