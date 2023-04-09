import axios from 'axios';
import slugify from 'slugify';
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
    if (req.method === 'POST' && session) {
        // console.log(req.body)
        const { title, imageUrl, description, category, price, availableQty } = req.body.productdata;
        
        const slug = slugify(title, { lower: true, strict: true });
        const data = {
            data: { 
                title: title,
                imageUrl: imageUrl,
                description: description,
                category: category,
                price: price,
                availableQty: availableQty,
                slug: slug
            }
        };
      
      try {
       
        const response = await axios.post(`${process.env.API_URL}/api/products`, data, {
            headers: {
                // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                Authorization: `Bearer ${session.user.jwtoken}`
            }
        });

        // let datas = await response;;
        // console.log(datas)
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  