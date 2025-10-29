const express = require('express');
const {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
  updateStatus,
  updateVagas,
} = require('../controllers/eventoController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getEventos)
  .post(protect, authorize('admin'), createEvento);

router.route('/:id')
  .get(getEvento)
  .put(protect, authorize('admin'), updateEvento)
  .delete(protect, authorize('admin'), deleteEvento);

router.patch('/:id/status', protect, authorize('admin'), updateStatus);
router.patch('/:id/vagas', protect, authorize('admin'), updateVagas);

module.exports = router;