require('dotenv').config()
const express = require('express')
const pool = require('./config/db')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json())

app.route('/now').get(async (req, res) => {
    const pgclient = await pool.connect()
    const { rows } = await pgclient.query('Select now() as now')
    await pgclient.release()
    res.send(rows[0].now)
})

//Заказы конкретного пользователя
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


//Сделать новый заказ
app.route('/make_order/:id').post(async (req, res) => {
    let pgclient = await pool.connect()
    try {
        const { id } = req.params
        
        //открываем транзакцию
        await pgclient.query('Begin')
        
        //создали заказ и получили его ID
        const { rows } = await pgclient.query( //rows деструкторизация
            `
            Insert into order_ (client_id) Values ($1) Returning id
            `, [id])
        const orderID = rows[0].id
        
        //параметры для подготовки IN запроса например IN ($1, $2, $3)
        let params = [] // ["$1", "$2", "$3"]
        let values = [] //[1, 2, 3]
        //цикл по body чтобы подготовить запрос на получение цены по каждому товару из заказа
        for (const [i, item] of req.body.entries()){
            params.push(`$${i+1}`)
            values.push(item.menu_id)
        }

        //Получить стоимость из меню
        const {rows: constQuery} = await pgclient.query(`
            Select id, price::numeric
            From menu
            Where id In (${params.join(',')})
        `, values)

        //создание новой переменной, которая будет включать тоже самое, что и входной body
        //только с вычисленной ценой
        let orderWithCost = []
        //для этого проходимся по каждому элементу в body 
        for (const item of req.body){
            //и для каждого элемента найти цену в constQuery, полученном при помощи запроса
            let cost = null
            for (const i of constQuery){
                //ищем совпадение id в costQuery с menu_id переданным в body
                if (i.id == item.menu_id){
                    cost = i.price
                }
            }
            //тут cost либо null, либо с значением цены 
            //и если cost null, то этo означает, что такого товара в таблице menu не найдено
            //то есть ошибка и надо сделать rollbackи вернуть сообщение клиенту
            if (!cost){
                throw new Error(`Not found in menu: ${item.menu_id}`)
            }
            orderWithCost.push({
                ...item,
                cost: cost * item.count //найденную стоймость на количество
            })
        }

        let promises = []
        for (const item of orderWithCost) {
            promises.push(await pgclient.query(
                `Insert into order_menu (order_id, menu_id, count, price)
                Values ($1, $2, $3, $4)`, 
                [orderID, item.menu_id, item.count, item.cost]))
        }

        await Promise.all(promises)

        await pgclient.query('Commit')

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

//Зарегистрироваться
app.route('/sign_up').post(async (req, res) => {
    const {
        name, 
        address,
        phone,
        username,
        password 
    } = req.body
    
    let pgclient = await pool.connect()
    try{
        const { rows } = await pgclient.query(`
        Insert into _client (name, address, phone, username, password)
        Values ($1, $2, $3, $4), 
        `,[name, address, phone, username, password])
        
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

