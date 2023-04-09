import axios from 'axios';
// import { authOptions } from 'pages/api/auth/[...nextauth]'
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    // console.log(session.user.id)
    if (req.method === 'POST' && session) {
        // console.log(req.body)
        const product = req.body;
        
        const data = {
            data: {
                // items: product ,
                products: product.id,
                // users_permissions_user: 4,
                users_permissions_user: session.user.id,
            }
        };
      
      try {
       
        const response = await axios.post(`${process.env.API_URL}/api/carts`, data, {
            headers: {
                // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                Authorization: `Bearer ${session.user.jwtoken}`
            }
        });
        // console.log(response)
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
}
  