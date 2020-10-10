require('dotenv').config()
const { Client } = require('pg')
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

/*
Оформление нового заказа:
    1. Создаем новый заказ и получаем его ID
    2. Подсчитываем цену заказа
    3. Каждый товар из заказа добавить в таблицу order_menu
*/

async function createOrder() {
    client.connect()
    const order = {
        clientID: 1,
        menu: {
            id: 1,
            count: 1,
        },
        // menu:[
        //     {
        //         id: 1,
        //         count: 1,
        //     },
        //     {
        //         id: 3,
        //         count: 3,
        //     },
        // ],
    }

    //Создали заказ и получили его ID
    const resOrderID = await client.query(
        `Insert into order_(client_id) Values ($1) Returning id`,
        [order.clientID]
    )
    const orderID = resOrderID.rows[0].id
    console.log('new order: ', orderID)

    const resPrice = await client.query(
        `
    Select id, price::numeric 
    From menu
    Where id = $1`,
        [order.menu.id]
    )

    const price = resPrice.rows[0].price * order.menu.count
    console.log('price: ', price)

    await client.query(
        'Insert into order_menu(order_id, menu_id, count, price) Values ($1, $2, $3, $4)',
        [orderID, order.menu.id, order.menu.count, price]
    )

    await client.end()
}

createOrder()
    .then(() => {
        console.log('success')
    })
    .catch((err) => {
        console.log('error', err)
    })
// const id = 1

// client.connect()

// //комментить на ctrl+k+c раскоментить ctrl+k+u

// client
//     .query(
//         `
//     Select *
//     From store
//     Where id = $1`,
//         [id]
//     )
//     .then((result) => console.log(result.rows))
//     .catch((e) => console.error(e.stack))
//     .then(() => client.end())
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
