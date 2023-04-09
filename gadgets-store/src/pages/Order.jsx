import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import Link from 'next/link'
import axios from 'axios';
import { signOut, useSession } from "next-auth/react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const Order = ({userOrders}) => {
    const { data: session } = useSession()
    const user = session?.user;

    // const searchParams = useSearchParams()
    // const OrderData = searchParams.get('cartData');
   
    
    // useEffect(() => {
    //     if(router.isReady){
    //         const { cartData } = router.query;
            
    //         console.log(cartData)
    //      }
    // }, [router.isReady]);
    console.log(userOrders)

  return (
    <>
      <MainNavbar/>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        {userOrders ?
          <Box>
            <TableContainer sx={{ backgroundColor: 'transparent',}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price&nbsp;($)</TableCell>
                    <TableCell align="right">Payment Status</TableCell>
                    <TableCell align="right">Delivery Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders.map((element, index) =>
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Avatar alt="Product" src={element.attributes.product.data.attributes.imageUrl} />
                        {element.attributes.product.data.attributes.title}
                      </TableCell>
                      <TableCell align="right">{'$ '+element.attributes.total}</TableCell>
                      <TableCell align="right">{element.attributes.status}</TableCell>
                      <TableCell align="right">pending</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer> 
            
          </Box>
        :
          <TableContainer></TableContainer>  
        }
    </Box>
    </>
  )
}



import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import MainNavbar from 'components/MainNavbar';




export async function getServerSideProps({ req, res }){
  const session = await getServerSession(req, res, authOptions);
  const loginUserId = session.user.id;
  // console.log(loginUserId)
  // const {API_URL} = process.env;

  
  const response = await axios.get(`${process.env.API_URL}/api/orders?populate=user&populate=product`, {
    headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
    }
  });
  const data = await response.data;
  // console.log(data)
  
  let orders = [];
  data.data.map((element)=>{
    if(element.attributes.user.data.id === loginUserId){
      orders.push(element);
    }
  })

  return {
    props: {
      userOrders: orders
    },
  }
}




export default Order