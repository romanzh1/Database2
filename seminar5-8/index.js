require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/auth')
const app = express()

var cors = require('cors')
//Services
const clientServices = require('./services/client')
const menuService = require('./services/menu')
const orderService = require('./services/order')

app.use(bodyParser.json())
app.use(cors())

app.route('/menu').get(async(req, res) => {
    const { name } = req.query

    try {
        const menu = await menuService.findMenu(name)
        res.send(menu)
    } catch (err) {
        res.status(500).send({
            error: err.message,
        })
    }
})


//Заказы конкретного пользователя
// id пользователя берётся из токена
app.route('/user_order').get(authMiddleware, async (req, res) => {
    try {
      const order = await orderService.findOrderByClientID(req.client.id)
      res.send(order)
    } catch (err) {
      res.status(500).send({
        error: err.message,
      })
    }
  })


//Сделать новый заказ
app.route('/make_order').post(authMiddleware, async (req, res) => {
    try {
      const orderID = await orderService.makeOrder(req.client.id, req.body)
      res.send({
        order_id: orderID,
      })
    } catch (err) {
      res.status(500).send({
        error: err.message,
      })
    }
  })

//Удалить заказ
app.route('/delete_order/:id').delete(async (req, res) => {
    try {
        const orderID = await orderService.DeleteOrder(req.params.id)
        res.send({order_id: orderID})
        } catch(err){
            res.status(500).send({
                error: err.message
            })
        }
})

//Вход
app.route('/sign_in').post(async (req, res) => {
    const { email, password } = req.body
  
    try {
      const token = await clientServices.signIn(email, password)
  
      res.send({
        token,
      })
    } catch (err) {
      res.status(500).send({
        error: err.message,
      })
    }
  })

//Регистрация в системе
app.route('/sign_up').post(async (req, res) => {
    // Если какой-то из параметров не будет передан, то
    // будет SQL ошибка (NOT NULL contraint)
    // По хорошему, нам надо тут проверить, что
    // параметры, которые не могут быть NULL переданы
    const { name, address, phone, email, password } = req.body
  
    try {
      const token = await clientServices.signUp({
        name,
        address,
        password,
        phone,
        email,
      })
  
      res.send({
        id: token,
      })
    } catch (err) {
      res.status(500).send({
        error: err.message,
      })
    }
  })

app.listen(80, () => {
    console.log('Server started! on http://localhost:80')
})

