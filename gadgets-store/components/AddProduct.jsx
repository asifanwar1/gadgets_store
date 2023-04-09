import React, {useState, useEffect} from 'react'
import { Form, Button } from 'react-bootstrap';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#c8f0e6',
    border: '2px solid #7b54bf',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

const AddProduct = () => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [availableQty, setAvailableQty] = useState('');

    const [titleError, setTitleError] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [availableQtyError, setavailableQtyError] = useState('');

    const options = [
        { value: 'watches', label: 'Watches' },
        { value: 'photography', label: 'Photography' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'mobile', label: 'Mobile' },
      ];

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     let isValid = true;
    
    //     if (!title) {
    //         setTitleError('Title is required.');
    //         isValid = false;
    //     }

    //     if (!imageUrl) {
    //         setImageUrlError('Image Url is required.');
    //         isValid = false;
    //     }

    //     if (!description) {
    //         setDescriptionError('Description is required.');
    //         isValid = false;
    //     }
    
    //     if (!category) {
    //         setCategoryError('Category is required.');
    //         isValid = false;
    //     }
    
    //     if (!price) {
    //         setPriceError('Price is required.');
    //         isValid = false;
    //     }

    //     if (!availableQty) {
    //         setavailableQtyError('Quantity is required.');
    //         isValid = false;
    //     }
    
    //     if (isValid) {
    //       try {
    //         const response = await axios.post('/api/addProduct', { 
    //             title, imageUrl, description, price, availableQty, category 
    //         });

    //         console.log(response.data); // Success message

    //         setTitle('');
    //         setImageUrl('');
    //         setDescription('');
    //         setCategory('');
    //         setPrice('');
    //         setAvailableQty('');

    //         setTitleError('');
    //         setImageUrlError('');
    //         setDescriptionError('');
    //         setCategoryError('');
    //         setPriceError('');
    //         setavailableQtyError('');
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    // };



    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const fields = [
          {name: 'title', setError: setTitleError},
          {name: 'imageUrl', setError: setImageUrlError},
          {name: 'description', setError: setDescriptionError},
          {name: 'category', setError: setCategoryError},
          {name: 'price', setError: setPriceError},
          {name: 'availableQty', setError: setavailableQtyError}
        ];
      
        let isValid = true;
      
        fields.forEach(({name, setError}) => {
          if (!eval(name)) {
            setError(`${name.charAt(0).toUpperCase() + name.slice(1)} is required.`);
            isValid = false;
          }
        });
      
        if (isValid) {
            const productdata = {
                title: title,
                imageUrl: imageUrl,
                description: description,
                price: Number(price),
                availableQty: Number(availableQty),
                // category: {enumeration: category} 
                category: category 
            }

          try {
            const response = await axios.post('/api/addProduct', { productdata });
            // title, imageUrl, description, price, availableQty, selectedCat: {enumeration: category} 
            console.log(response.data); // Success message
      
            fields.forEach(({name, setError}) => {
              eval(`set${name.charAt(0).toUpperCase() + name.slice(1)}('')`);
              setError('');
            });
          } catch (error) {
            console.log(error);
          }
        }
      };



  return (
    <>
    <Box sx={{  width: '95%', m:'auto', mt: 2, bgcolor: 'transparent', overflow: 'auto'}} >
        <Grid container spacing={2} sx={{mt: 1}}>
            <Grid item md={7} >
                <Box sx={{ m: 'auto', textAlign: 'center', bgcolor: 'transparent',  borderRadius: '16px',  overflow: 'auto', filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))'}}>
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        Add Products
                    </Typography>
                    {/* <img src="https://res.cloudinary.com/dgcrcj5sr/image/upload/v1676749160/Gadgets-Store_images/banners/addProductImage_jkbq4p.png" alt='In Demand' className="productMainPage"/> */}
                    <img src="https://res.cloudinary.com/dgcrcj5sr/image/upload/v1680705830/Gadgets-Store_images/banners/addProductImage1_equ1an.png" alt='In Demand' className="productMainPage"/>
                    <Box className='addProductBtn'>
                        <Fab color="primary" onClick={handleOpen} sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}} aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Box>
                    <br></br>
                    <br></br>
                    <br></br>
                </Box>
                        
            </Grid>
            <Grid item md={5}>
                <Box sx={{ m: 'auto', textAlign: 'center', bgcolor: 'transparent',  borderRadius: '16px',  overflow: 'auto', filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))'}}>
                    <Typography variant="h5" gutterBottom >
                        Most In Demand Product
                    </Typography>
                    <img src="https://res.cloudinary.com/dgcrcj5sr/image/upload/v1676209466/Gadgets-Store_images/17_Samsung-Galaxy-Watch_cyhbdm.png" alt='In Demand' className="productMainPage"/>
                    <Box >
                        <Fab variant="extended" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}} >
                            <AddIcon />
                            See Details
                        </Fab>
                    </Box>
                    <br></br>
                </Box>        
            </Grid>
        </Grid>
        <br></br>
    </Box>



    {/* Add Product Modal */}

    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add Product Details
            </Typography>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label style={{float: 'left', marginLeft: '20px'}}>Product Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(event) => setTitle(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                    <Form.Text className="text-danger">{titleError}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{float: 'left', marginLeft: '20px'}}>Image Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter Image Url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                    <Form.Text className="text-danger">{imageUrlError}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{float: 'left', marginLeft: '20px'}}>Category</Form.Label>
                    <Form.Select aria-label="Default select example" value={category} onChange={(event) => setCategory(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}>
                        <option>Open this menu</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>
                    {/* <Form.Control type="text" placeholder="Enter Category" value={category} onChange={(event) => setCategory(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/> */}
                    <Form.Text className="text-danger">{categoryError}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{float: 'left', marginLeft: '20px'}}>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Price" value={price} onChange={(event) => setPrice(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                    <Form.Text className="text-danger">{priceError}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{float: 'left', marginLeft: '20px'}}>Available Qty</Form.Label>
                    <Form.Control type="text" placeholder="Enter Quantity" value={availableQty} onChange={(event) => setAvailableQty(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                    <Form.Text className="text-danger">{availableQtyError}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicMessage">
                    <Form.Label style={{float: 'left', marginLeft: '20px'}}>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Description" value={description} onChange={(event) => setDescription(event.target.value)} style={{backgroundColor: 'transparent', border: '1px solid black', width: '95%', margin: 'auto'}}/>
                    <Form.Text className="text-danger">{descriptionError}</Form.Text>
                </Form.Group>

                <Fab variant="extended" type="submit" sx={{ mt: 2, backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'}, }}>
                    <AddIcon sx={{ mr: 1 }} />
                    Submit 
                </Fab>
            </Form>
          </Box>
        </Fade>
      </Modal>
    </div>
    </>
  )
}

export default AddProduct