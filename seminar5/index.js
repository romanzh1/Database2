require('dotenv').config()
const express = require('express')
const pool = require('./config/db')
const app = express()

app.route('/now').get(async (req, res) => {
    const pgclient = await pool.connect()
    const { rows } = await pgclient.query('Select now() as now')
    await pgclient.release()
    res.send(rows[0].now)
})

app.route('/user_order/:id').get(async (req, res) => {
    let pgclient
    try {
    //Значение из URL
    pgclient = await pool.connect()
    const { id } = req.params
    const { rows } = await pgclient.query(
        `
        Select id, client_id, created_at
        From order_
        Where client_id = $1
        Order by created_at desc
        `, [id])
        await pgclient.release()
        res.send(rows)
    } catch(err){
        res.status(500).send({
            error: err.message
        })
        console.error(err)
    } finally{
        await pgclient.release()
    }
})

app.route('/make_order/:id').post(async (req, res) => {
    try {
        pgclient = await pool.connect()
        const { id } = req.params
        const { rows } = await pgclient.query(
            `
            Insert into order_ (client_id) Values ($1) Returning id
            `, [id])
        const orderID = rows[0].id
        res.send({
            order_id: orderID
        })
        } catch(err){
            res.status(500).send({
                error: err.message
            })
            console.error(err)
        } finally{
            await pgclient.release()
        }
})

app.listen(8080, () => {
    console.log('Server started! on http://localhost:8080')
})

