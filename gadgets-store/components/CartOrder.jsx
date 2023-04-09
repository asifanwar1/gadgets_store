import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import { Form } from 'react-bootstrap';
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
import countries from '../countries.json'
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '40rem',
    overflow: 'auto',
    borderRadius:'5px',
    backgroundColor: '#c8f0e6',
    border: '2px solid #7b54bf',
    boxShadow: 24,
    p: 4,
};

const CartOrder = ({cartData}) => {
    const { data: session } = useSession()
    const user = session?.user;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log(cartData)

    const [fullName, setFullName] = useState('');
    const [country, setCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [streetAddressError, setStreetAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [orderNotesError, setOrderNotesError] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const stripe = await stripePromise;
      
        const fields = [
          {name: 'fullName', setError: setFullNameError},
          {name: 'country', setError: setCountryError},
          {name: 'streetAddress', setError: setStreetAddressError},
          {name: 'city', setError: setCityError},
          {name: 'state', setError: setStateError},
          {name: 'phone', setError: setPhoneError},
          {name: 'email', setError: setEmailError},
          {name: 'orderNotes', setError: setOrderNotesError}
        ];
      
        let isValid = true;
      
        fields.forEach(({name, setError}) => {
          if (!eval(name)) {
            setError(`${name.charAt(0).toUpperCase() + name.slice(1)} is required.`);
            isValid = false;
          }
        });
      
        if (isValid) {
            const customerdata = {
                fullName: fullName,
                country: country,
                state: state,
                city: city,
                streetAddress: streetAddress,
                phone: phone,
                email: email,
                orderNotes: orderNotes,
                cartData: cartData
            }

          try {
            const session  = await axios.post('/api/checkout_sessions', { customerdata });
           
            // console.log(session); // Success message
            console.log(session.data); // Success message

            await stripe.redirectToCheckout({ sessionId: session.data });
      
            fields.forEach(({name, setError}) => {
              eval(`set${name.charAt(0).toUpperCase() + name.slice(1)}('')`);
              setError('');
            });
          } catch (error) {
            console.log(error);
          }
        }
    }
  
    return (
        <Box >
            <Fab variant="extended" onClick={handleOpen} sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                <ShoppingCartCheckoutIcon/>    
                Proceed   
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <Box sx={style} className='cartModal'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter Details
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{fullNameError}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{emailError}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter Phone Number" value={phone} onChange={(event) => setPhone(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{phoneError}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Country</Form.Label>
                            <Form.Select aria-label="Default select example" value={country} onChange={(event) => setCountry(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}>
                                <option>Select Country</option>
                                {countries.countries.map((option) => (
                                    <option key={option.name} value={option.code}>
                                    {option.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Text className="text-danger">{countryError}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>State</Form.Label>
                            <Form.Control type="text" placeholder="Enter State" value={state} onChange={(event) => setState(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{stateError}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter City" value={city} onChange={(event) => setCity(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{cityError}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Street Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Street Number & House Number" value={streetAddress} onChange={(event) => setStreetAddress(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{streetAddressError}</Form.Text>
                        </Form.Group>


                        <Form.Group controlId="formBasicMessage">
                            <Form.Label style={{float: 'left', marginLeft: '20px'}}>Order Notes</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Order Notes" value={orderNotes} onChange={(event) => setOrderNotes(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                            <Form.Text className="text-danger">{orderNotesError}</Form.Text>
                        </Form.Group>

                        <Fab variant="extended" type="submit" sx={{mt: 2, backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                            <AddIcon sx={{ mr: 1 }} />
                            Place Order 
                        </Fab>
                    </Form>
                </Box>
            </Modal>
    
        </Box>
    )
}

export default CartOrder