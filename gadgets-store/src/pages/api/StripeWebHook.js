const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { buffer } = require('micro');
import axios from 'axios';
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

module.exports.config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;
      const revenueId = paymentIntent.metadata.revenueId;
      const singleOrderId = paymentIntent.metadata.singleOrderId;
      const singleRevenueId = paymentIntent.metadata.singleRevenueId;
      
    
      console.log("metaData: ", paymentIntent.metadata); 

        if(orderId && revenueId){
          let orderIdsArr = orderId.split(",");
          let revenueIdArr = revenueId.split(",");
          
            const data = {
              data:{
                  status: 'paid',
              }
            }
            
            orderIdsArr.map(async (element)=>{
              let updateOrderRes = await axios.put(`${process.env.API_URL}/api/orders/${element}`, data, {
                headers: {
                  // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                  Authorization: `Bearer ${session.user.jwtoken}`
                }
              });
              console.log(updateOrderRes)
            });


            const revenueData = {
              data:{
                transactionStatus: 'completed',
              }
            }
            
            revenueIdArr.map(async (element)=>{
              let updateRevenueRes = await axios.put(`${process.env.API_URL}/api/revenues/${element}`, revenueData, {
                headers: {
                  // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                  Authorization: `Bearer ${session.user.jwtoken}`
                }
              });
              console.log(updateRevenueRes)
            });



        }
        else{

            const data = {
                data:{
                    status: 'paid',
                }
              }
              
            let updateOrderRes = await axios.put(`${process.env.API_URL}/api/orders/${singleOrderId}`, data, {
                headers: {
                    // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                    Authorization: `Bearer ${session.user.jwtoken}`
                }
            });  
            
            
            const revenueData = {
              data:{
                transactionStatus: 'completed',
              }
            }
              
            let updateRevenueRes = await axios.put(`${process.env.API_URL}/api/revenues/${singleRevenueId}`, revenueData, {
              headers: {
                // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                Authorization: `Bearer ${session.user.jwtoken}`
              }
            });           

        }



      console.log('PaymentIntent was successful!');
    } else if (event.type === 'payment_method.attached') {
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

module.exports.default = webhookHandler;


// // const { Stripe } = require('stripe');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// //   apiVersion: '2020-08-27',
// // });

// async function handleStripeWebhook(req, res) {
//   const event = req.body;
//     // console.log(event)
//     // console.log("event: ", event)
//   try {
//     // Verify the webhook signature to ensure that the event came from Stripe
//     const sig = req.headers['stripe-signature'];
//     // console.log("sig: ", sig)
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
//     // console.log("whs: ", webhookSecret)
//     const verifiedEvent = stripe.webhooks.constructEvent(event, sig, webhookSecret);
//     // console.log("verified: ", verifiedEvent)
//     if (verifiedEvent.type === 'payment_intent.succeeded') {
//       // Handle the successful payment event here
//       const paymentIntent = verifiedEvent.data.object;
//       console.log('Payment intent succeeded:', paymentIntent.id);
//     }

//     res.status(200).json({ received: true });
//   } catch (err) {
//     console.error('Error processing webhook:', err);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// }

// module.exports = handleStripeWebhook;




// // api/stripe-webhooks.js

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// // console.log("stripa")
// // console.log(stripe)
// const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

// module.exports = {
//   // async post(ctx) {
//   async webhook(ctx) {
//     console.log(ctx)
//     const event = stripe.webhooks.constructEvent(
//       ctx.request.body,
//       ctx.request.headers['stripe-signature'],
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     if (event.type === 'checkout.session.completed') {
//       try {
//         const session = event.data.object;
//         const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
//         const customer = await stripe.customers.retrieve(paymentIntent.customer);

//         const order = await strapi.services.order.create({
//           stripe_checkout_id: session.id,
//           stripe_payment_intent_id: paymentIntent.id,
//           customer_email: customer.email,
//           // other order fields here
//         });

//         ctx.body = sanitizeEntity(order, { model: strapi.models.order });
//       } catch (err) {
//         console.error(err);
//         ctx.status = 500;
//       }
//     } else {
//       console.log(`Unhandled event type: ${event.type}`);
//     }
//   },
// };
