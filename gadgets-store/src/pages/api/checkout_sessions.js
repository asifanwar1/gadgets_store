const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import axios from 'axios';
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"


export default async function handler(req, res) {
  const userSession = await getServerSession(req, res, authOptions)

  let {fullName, country, state, city, streetAddress, phone, orderNotes, cartData} = req.body.customerdata;
  // console.log("cartData: ", cartData)

  if (req.method === 'POST') {

    let address = country + ' ' + state + ' ' + city + ' ' + streetAddress;
    let allProducts = [];
    let allPrices = [];
    let allQty = [];
    
    if(cartData.length > 1){
      
      let cartIds = [];
      let allOrderIds = [];
      let allRevenueIds = [];

      let runMap = cartData.map(async (element, index)=>{
        let productQty = element.attributes.products.data[0].attributes.itemQty;
        let productId = element.attributes.products.data[0].id;
        cartIds.push(element.id);

        let response = await axios.get(`${process.env.API_URL}/api/products/${productId}`, {
          headers: {
              // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
              Authorization: `Bearer ${userSession.user.jwtoken}`
          }
        });
        let resData = await response.data;

        let productPrice = resData.data.attributes.price;
        let productName = resData.data.attributes.title;
        let productImage = resData.data.attributes.imageUrl;
        

        const data = {
          data: {
              status: 'unpaid' ,
              product: productId,
              // product: productIds.map(id => ({ id })),
              user: userSession.user.id,
              total: productQty * productPrice,
              address: address,
              phone: phone,
              orderNotes: orderNotes,
              quantity: productQty
          }
        };


        let summary = {
          productId: productId,
          productName: productName,
          nameWithQty: `${productQty} ${productName}`,
          productQty: productQty,
          total: productQty * productPrice,
          productImage: productImage,
        }
        
        allProducts.push(summary);
        allPrices.push(productQty * productPrice);
        allQty.push(productQty);

        let orderRes = await axios.post(`${process.env.API_URL}/api/orders`, data, {
          headers: {
              // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
              Authorization: `Bearer ${userSession.user.jwtoken}`
          }
        });
        let orderResData = await orderRes.data;
        let currentOrderId = orderResData.data.id;
        
        allOrderIds.push(currentOrderId);


        const revenueData = {
          data: {
              product: productId,
              quantity: productQty,
              totalAmount: productQty * productPrice,
              order: currentOrderId,
              transactionStatus: 'pending' ,
          }
        };

        let revenueRes = await axios.post(`${process.env.API_URL}/api/revenues`, revenueData, {
          headers: {
              // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
              Authorization: `Bearer ${userSession.user.jwtoken}`
          }
        });

        let revenueResData = await revenueRes.data;
        let currentRevenueId = revenueResData.data.id;
        
        allRevenueIds.push(currentRevenueId);
        
      });

      await Promise.all(runMap);

      

      let sum = allPrices.reduce((accumulator, currentValue) => accumulator + currentValue);
      
      let propertyName = 'nameWithQty';
      const productNamesString = allProducts.map(element => element[propertyName]).join(', ');
      let total_Price = sum * 100 
       
      try {
        
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                unit_amount: total_Price,
                currency: 'usd',
                product_data: {
                  name: productNamesString,
                  // details: allProducts,
                },
              },
              quantity: 1,
            },
          ],
          payment_intent_data:{
            metadata: {
              // orderId: allOrderIds 
              orderId: allOrderIds.join(', '), 
              revenueId: allRevenueIds.join(', '), 
            },
          },
          mode: 'payment',
          payment_method_types: ['card'],

          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
      // console.log(session)
      const data = {
        data:{
          checkout_session: session.id,
        }
      }
      
      allOrderIds.map(async (element)=>{
        let updateOrderRes = await axios.put(`${process.env.API_URL}/api/orders/${element}`, data, {
          headers: {
            // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
            Authorization: `Bearer ${userSession.user.jwtoken}`
          }
        });
      });


      cartIds.map(async (element)=>{
        let deleteCart = await axios.delete(`${process.env.API_URL}/api/carts/${element}`, {
          headers: {
            // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
            Authorization: `Bearer ${userSession.user.jwtoken}`
          }
        });
      });

      
      
      res.send(session.id);
        
      } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message);
      }

    }
    else{
      
      let productQty = cartData[0].attributes.products.data[0].attributes.itemQty;
      let productId = cartData[0].attributes.products.data[0].id;
      let cartId = cartData[0].id;

      let response = await axios.get(`${process.env.API_URL}/api/products/${productId}`, {
        headers: {
            // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
            Authorization: `Bearer ${userSession.user.jwtoken}`
        }
      });
      let resData = await response.data;

      let productPrice = resData.data.attributes.price;
      let productName = resData.data.attributes.title;
      let productImage = resData.data.attributes.imageUrl;


      let summary = {
        productId: productId,
        productName: productName,
        nameWithQty: `${productQty} ${productName}`,
        productQty: productQty,
        total: productQty * productPrice,
        productImage: productImage,
      }

      const data = {
        data: {
          status: 'unpaid' ,
          product: productId,
          user: userSession.user.id,
          total: productQty * productPrice,
          address: address,
          phone: phone,
          orderNotes: orderNotes,
          quantity: productQty,
        }
      };
      
      
      let orderRes = await axios.post(`${process.env.API_URL}/api/orders`, data, {
        headers: {
          // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
          Authorization: `Bearer ${userSession.user.jwtoken}`
        }
      });
      
      let orderResData = await orderRes.data;
      let currentOrderId = orderResData.data.id;


      const revenueData = {
        data: {
            product: productId,
            quantity: productQty,
            totalAmount: productQty * productPrice,
            order: currentOrderId,
            transactionStatus: 'pending' ,
        }
      };

      let revenueRes = await axios.post(`${process.env.API_URL}/api/revenues`, revenueData, {
        headers: {
            // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
            Authorization: `Bearer ${userSession.user.jwtoken}`
        }
      });

      let revenueResData = await revenueRes.data;
      let currentRevenueId = revenueResData.data.id;

      

      let total_Price = summary.total * 100 ;
      let productNamesString = summary.nameWithQty;

      try {
        
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                unit_amount: total_Price,
                currency: 'usd',
                product_data: {
                  name: productNamesString,
                  // details: allProducts,
                },
              },
              quantity: 1,
            },
          ],
          payment_intent_data:{
            metadata: {
              singleOrderId: currentOrderId ,
              singleRevenueId: currentRevenueId
              // orderId: allOrderIds.join(', ') 
            },
          },
          mode: 'payment',
          payment_method_types: ['card'],

          success_url: `${req.headers.origin}/?success=true`,
          cancel_url: `${req.headers.origin}/?canceled=true`,
        });
      // console.log(session)
      
      const data = {
        data:{
          checkout_session: session.id,
        }
      }
      
    
      let updateOrderRes = await axios.put(`${process.env.API_URL}/api/orders/${currentOrderId}`, data, {
        headers: {
          // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
          Authorization: `Bearer ${userSession.user.jwtoken}`
        }
      });


      let deleteCart = await axios.delete(`${process.env.API_URL}/api/carts/${cartId}`, {
        headers: {
          // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
          Authorization: `Bearer ${userSession.user.jwtoken}`
        }
      });
      
      
      res.send(session.id);

      } catch (error) {
        console.log(error)
        res.status(error.statusCode || 500).json(error.message);
      }


    }
   
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
























// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// import axios from 'axios';
// import { authOptions } from './auth/[...nextauth]'
// import { getServerSession } from "next-auth/next"


// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // console.log(req.body.customerdata.cartData)
//     let {fullName, country, state, city, streetAddress, phone, orderNotes, cartData} = req.body.customerdata;
//     console.log(req.body.customerdata)
//     let address = country + ' ' + state + ' ' + city + ' ' + streetAddress;
    
//     if(cartData.length > 1){
      
//       cartData.map(async (element, index)=>{
//         let productQty = element.attributes.products.data[0].attributes.itemQty;
//         let productId = element.attributes.products.data[0].id;

//         let response = await axios.get(`${process.env.API_URL}/api/products/${productId}`, {
//           headers: {
//               Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
//           }
//         });
//         let data = await response.data;
        
//       })

//     }
//     else{
//       let priceId  = cartData[0].attributes.products.data[0].attributes
//       let productQty = cartData[0].attributes.products.data[0].attributes.itemQty;
//       let productId = cartData[0].attributes.products.data[0].id;

//       const data = {
//         data: {
//             status: 'unpaid' ,
//             product: productId,
//             user: 4,
//             total: priceId,
//             address: address,
//             phone: phone,
//             orderNotes: orderNotes,
//             quantity: productQty
//         }
//       };
//     }
//     try {

//       // const response = await axios.post(`${process.env.API_URL}/api/carts`, data, {
//       //   headers: {
//       //       Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
//       //   }
//       // });
//       // const price = await stripe.prices.create({
//       //   product: '{{PRODUCT_ID}}',
//       //   unit_amount: 1000,
//       //   currency: 'usd',
//       // });
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             price_data: {
//               unit_amount: 4000,
//               currency: 'usd',
//               product_data: {
//                 name: 'Test product'
//               },
//             },
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             // price: priceId,
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         payment_method_types: [
//           'card',
//         ],
//         success_url: `${req.headers.origin}/?success=true`,
//         cancel_url: `${req.headers.origin}/?canceled=true`,
//       });
//       console.log(session)
//       // res.redirect(303, session.url);
//       res.send(session.id);
//     } catch (err) {
//       console.log(err)
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }