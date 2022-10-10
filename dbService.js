import pg from 'pg'

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

//Getting all Users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      res.send(500)
    }

    return res.send(results.rows)
  })
}
//getting Single User
const getUserById = async (req, res) => {
  const { userId } = req.params
  pool.query(
    'SELECT * FROM users WHERE id = $1',
    [userId],
    (error, results) => {
      if (error) {
        throw error
      }
      return res.send(results.rows[0])
    }
  )
}

//Adding new User to Db
const addNewUser = (req, res) => {
  let { name, email, bio, id } = req.body
  //const id = Math.ceil((Math.random(4)*100000));

  if (!id) {
    id = Math.ceil(Math.random(4) * 100000)
  }

  pool.query(
    'INSERT INTO users (name, email, bio, id) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, bio, id],
    (error, results) => {
      if (error) {
        throw error
      }
      return res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    }
  )
}

//Update User by Id
const updateUserById = async (request, response) => {
  const id = parseInt(request.params.userId)
  const { name, email, bio } = request.body

  const results = await pool.query('SELECT * FROM users WHERE id = $1', [id])
  if (results.rows[0]) {
    pool.query(
      'UPDATE users SET name = $1, email = $2, bio = $3 WHERE id = $4',
      [name, email, bio, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  } else {
    pool.query(
      'INSERT INTO users (name, email, bio, id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, bio, id],
      (error, results) => {
        if (error) {
          throw error
        }
        return response
          .status(201)
          .send(`User added with ID: ${results.rows[0].id}`)
      }
    )
  }
}

//deleting user from Db
const deleteUser = (req, res) => {
  const id = parseInt(req.params.userId)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

const dbService = {
  getUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUser
}

export default dbService
