const router = require('express').Router()

router.get('/', (req, res) => {
  res.json('All good in here')
})
router.get('*', (req, res) => {
  res.json('404 no page')
})
module.exports = router
