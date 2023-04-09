import axios from 'axios';
import { setCookie } from 'nookies'

export default async (req, res) => {
  const { password, identifier } = req.body;

  try {
    // const postRes = await axios.post('http://localhost:1337/api/auth/local', {
    //   identifier,
    //   password,
    // })
    console.log(identifier)
    const postRes = await axios.post(`${process.env.API_URL}/api/auth/local`, {
        identifier,
        password,
      }, {
        method: 'POST',
      })
      // console.log("aa")
      console.log(postRes.data.jwt)
      // console.log("bb")
    setCookie({ res }, 'jwt', postRes.data.jwt, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(201).send(postRes.data.user);
  } catch (e) {
    res.status(400).send(e.response.data.message[0].messages[0]);
  }
}