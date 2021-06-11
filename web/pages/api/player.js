const db = require('../../lib/db')
const escape = require('sql-template-strings')
module.exports = async (req, res) => {
  const players = await db.query(escape`
	SELECT steam
	FROM lvl_base
    ORDER BY value DESC
  `)
  res.status(200).json({ players })
}