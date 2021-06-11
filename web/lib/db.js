const mysql = require('serverless-mysql')

const db = mysql({
  config: {
  host: process.env.mysqlurl,
  user: 'ink',
  password: 'Cs73841959',
  database: 'csgo'
  }
})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
