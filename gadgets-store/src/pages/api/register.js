import axios from 'axios';
import { setCookie } from 'nookies'

export default async (req, res) => {
  const { username, password, email } = req.body;

  try {
    
    const response = await axios.post(`${process.env.API_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      }, {
        method: 'POST',
      })
   
    setCookie({ res }, 'jwt', response.data.jwt, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(200).end();
  } catch (e) {
    // res.status(400).send(e.response.data.message[0].messages[0]);
    res.status(400).send(e);
  }
}