const express = require('express');
const {
  getTrilhas,
  getTrilha,
  createTrilha,
  updateTrilha,
  deleteTrilha,
  updateDisponibilidade,
} = require('../controllers/trilhaController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getTrilhas)
  .post(protect, authorize('admin'), createTrilha);

router.route('/:id')
  .get(getTrilha)
  .put(protect, authorize('admin'), updateTrilha)
  .delete(protect, authorize('admin'), deleteTrilha);

router.patch('/:id/disponibilidade', protect, authorize('admin'), updateDisponibilidade);

module.exports = router;