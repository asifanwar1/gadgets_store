import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Head from 'next/head'
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
import Link from 'next/link'
import { useRouter } from 'next/router';
import CartOrder from 'components/CartOrder';
import CheckOut from 'components/CheckOut';
import MainNavbar from 'components/MainNavbar';



const Cart = ({cartItems}) => {

  const { data: session } = useSession()
  const user = session?.user;
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  // const userId = user.id;
  // console.log(userId)
  // console.log(cartItems)
 
  const [cartKey, setCartKey] = useState(0);
  const [allCartItems, setAllCartItems] = useState(cartItems);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [eachItemTotalPrice, setEachItemTotalPrice] = useState([0]);
  const [qty, setQty] = useState(1);

  useEffect(()=>{
    if(user){

      let itmesPriceArr = [];
      cartItems.map((element)=>{
        let itemPrice = element.attributes.products.data[0].attributes.price;
        element.attributes.products.data[0].attributes.totalPrice = itemPrice;
        element.attributes.products.data[0].attributes.itemQty = 1;
        itmesPriceArr.push(element.attributes.products.data[0].attributes.totalPrice)
      })
      setAllCartItems(cartItems);
      if(itmesPriceArr.length > 0){
        const sum = itmesPriceArr.reduce((accumulator, currentValue) => accumulator + currentValue);
        setItemsPrice(sum);
      }
    }
  },[])


  useEffect(()=>{
    if(user){
      let itmesPriceArr = [];
      allCartItems.map((element)=>{
        itmesPriceArr.push(element.attributes.products.data[0].attributes.totalPrice);
      })

      if(itmesPriceArr.length > 0){
      const sum = itmesPriceArr.reduce((accumulator, currentValue) => accumulator + currentValue);
      setItemsPrice(sum);
      }
    }
  },[cartKey])

  const handleDecrement = (cartId) => {
    let btnId = document.getElementById(cartId+'qty');
    let currentValue = Number(btnId.innerText);
    
    if (currentValue > 1) {
      btnId.innerText = currentValue - 1;
    }

    let getItem = allCartItems.find(element => element.id === cartId);
    let productPrice = getItem.attributes.products.data[0].attributes.price;
    let totalPrice = productPrice * Number(btnId.innerText);
    getItem.attributes.products.data[0].attributes.totalPrice = totalPrice;
    getItem.attributes.products.data[0].attributes.itemQty = Number(btnId.innerText);
    setCartKey(currentValue);
  };

  const handleIncrement = (cartId) => {
    let btnId = document.getElementById(cartId+'qty');
    let currentValue = Number(btnId.innerText);
    
    if (currentValue < 5) {
      btnId.innerText = currentValue + 1;
    }

    let getItem = allCartItems.find(element => element.id === cartId);
    let productPrice = getItem.attributes.products.data[0].attributes.price;
    let totalPrice = productPrice * Number(btnId.innerText);
    getItem.attributes.products.data[0].attributes.totalPrice = totalPrice;
    getItem.attributes.products.data[0].attributes.itemQty = Number(btnId.innerText);
    setCartKey(currentValue);
  };


  const handleDeleteItem = async (cartId) =>{
    console.log(cartId)
    
    if(cartId){
      const newList = allCartItems.filter(element => {
        return element.id !== cartId;
      })
      setAllCartItems(newList)

      try {
        const res = await axios.post('/api/deleteCartItem', {cartId});
        if(res.status === 200){
          console.log("cart updated");
        }
      } catch (err) {
        console.log(err);
      }
    }

  }

  // const handleProceed = () => {
  //   router.push({
  //     pathname: '/Order',
  //     query:  { cartItems: allCartItems }, 
  //   });
  // };
  if(user){
    return (
      <>
        <Head>
          <title>Gadgets Galore</title> 
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <MainNavbar/>
        <Box sx={{ flexGrow: 1, mt: 5 }}>
          {allCartItems ?
            <Box>
              <TableContainer sx={{ backgroundColor: 'transparent',}}>
                <Table sx={{ minWidth: 650, filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.63))' }} aria-label="simple table">
                  <TableHead>
                    <TableRow> 
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price&nbsp;($)</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      {/* <TableCell align="right">Total Price</TableCell> */}
                      <TableCell align="right">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCartItems.map((element, index) =>
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          <Avatar alt="Product" src={element.attributes.products.data[0].attributes.imageUrl} />
                          {element.attributes.products.data[0].attributes.title}
                        </TableCell>
                        <TableCell align="right">{'$ '+element.attributes.products.data[0].attributes.price}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ minWidth: 120 }}>
                            <ButtonGroup size="small" aria-label="small button group">
                              <Button onClick={() => handleDecrement(element.id)}><RemoveIcon/></Button>
                              <Button id={element.id+'qty'}>{qty}</Button>
                              <Button onClick={() => handleIncrement(element.id)}><AddIcon/></Button>
                            </ButtonGroup>
                          </Box>
                        </TableCell>
                        <TableCell align="right"><DeleteIcon onClick={() => handleDeleteItem(element.id)} sx={{color: '#7b54bf', cursor: 'pointer' ,'&:hover': {color : '#9256fa'},}}/></TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer> 
              <Box sx={{textAlign: 'center', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.63))' }}>
                <Typography variant="h5" gutterBottom >
                  {itemsPrice}
                </Typography>
               
                <CartOrder cartData = {allCartItems}/>
                <br></br>
                <br></br>
          
              </Box>
            </Box>
          :
            <TableContainer></TableContainer>  
          }
      </Box> 
      </>
    )

  }
  else{
    return (
      <>
        <Head>
          <title>Gadgets Galore</title> 
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.png" />
        </Head>
        <MainNavbar/>
        <Box sx={{textAlign: 'center', mt: '5%' }}>
          <Typography variant="h5" gutterBottom >
            Please <Link href='/Login' className='listItem'>Sign In</Link> Or <Link href='/Register' className='listItem'>Create</Link> an account
          </Typography>
          <Typography variant="h5" gutterBottom >
            to buy your favourite tech gadgets
          </Typography>
        </Box>
      </>  
    )
  }
}





import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"





export async function getServerSideProps({ req, res }){
  const session = await getServerSession(req, res, authOptions);

  if(session){
    const loginUserId = session.user.id;

    const response = await axios.get(`${process.env.API_URL}/api/carts?populate=users_permissions_user&populate=products`, {
      headers: {
          // Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
          Authorization: `Bearer ${session.user.jwtoken}`
      }
    });
    // console.log(response)
    const data = await response.data;
    console.log(data)
    let userCart = [];
    data.data.map((element)=>{
      if(element.attributes.users_permissions_user.data.id === loginUserId){
        userCart.push(element);
      }
      // console.log(element.attributes.users_permissions_user.data.id)a
    })
  
    return {
      props: {
        cartItems: userCart
      },
    }
  }
  else{
    return {
      props: {
        // cartItems: userCart
      },
    }
  }
  

}

export default Cart








