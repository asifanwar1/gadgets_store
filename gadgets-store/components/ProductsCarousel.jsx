import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const ProductsCarousel = () => {
  return (
    <Box sx={{  width: '98%', m:'auto', mt: 0.5, bgcolor: 'transparent',  borderRadius: '20px', overflow: 'auto'}} className="boxBanner">
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImage"
          src="https://res.cloudinary.com/dgcrcj5sr/image/upload/v1680486599/Gadgets-Store_images/banners/banner1i_wcx54u.png"
          alt="First slide"
        />
        <Carousel.Caption style={{color:'#9256fa',}}>
          <h3>10% off on all products</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImage"
          src="https://res.cloudinary.com/dgcrcj5sr/image/upload/v1680486212/Gadgets-Store_images/banners/banner1l_ifhpth.png"
          alt="Second slide"
        />

        <Carousel.Caption style={{color:'#9256fa'}}>
          <h3>10% off on all products</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carouselImage"
          src="https://res.cloudinary.com/dgcrcj5sr/image/upload/v1680485994/Gadgets-Store_images/banners/banner1k_vchynx.png"
          alt="Third slide"
        />

        <Carousel.Caption style={{color:'#9256fa'}}>
          <h3>10% off on all products</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </Box>
  )
}

export default ProductsCarousel