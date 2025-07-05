const express = require('express');
const router = express.Router();
const checkAndCreateReorders = require('../utils/reorder');

router.post('/trigger', async (req, res) => {
  try {
    await checkAndCreateReorders();
    res.json({ message: 'Reorder check triggered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
