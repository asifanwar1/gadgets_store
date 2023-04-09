import axios from 'axios';
import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

    if (req.method === 'POST' && session) {
      const { message } = req.body;
     
      const data = {
        data: {
          userMessage: message,
          user: session.user.id,
        }
      };

      try {
        const response = await axios.post(`${process.env.API_URL}/api/messages`, data, {
          headers: {
              // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
              Authorization: `Bearer ${session.user.jwtoken}`
          }
        });
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  