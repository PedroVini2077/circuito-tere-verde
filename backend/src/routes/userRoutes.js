const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;