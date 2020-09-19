require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const id = 1

client.connect()

//rjкомментить на ctrl+k+c раскоментить ctrl+k+u
client
    .query(
        `
    Select *
    From store
    Where id = $1`,
        [id]
    )
    .then((result) => console.log(result.rows))
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
// client.query(
//     `
//     Select *
//     From store
//     Where id = $1
//     `,
//     [id],
//     function (err, res) {
//         console.log(1)
//         if (err) {
//             console.log(err)
//         }
//         if (res) {
//             console.log(res.rows)
//         }
//         client.end()
//     }
// )

console.log(2)
