import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const AboutUs = () => {
  return (
        <Box sx={{  width: '98%', m:'auto', mt: 2, bgcolor: 'transparent',  borderRadius: '16px', overflow: 'auto'}} className="boxBanner">
            <br></br>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item xs={8} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px',  overflow: 'auto'}} className="svcGrid">
         
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        About Us
                    </Typography>

                </Grid>
                <br></br>
               
            </Grid>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item sm={5} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px', height: '30vh', overflow: 'auto'}} className="svcGrid">
         
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        Welcome to Gadgets Galore
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Welcome to Gadgets Galore, your premier destination for 
                        the latest and greatest in technology. We're passionate 
                        about gadgets and believe that everyone should have 
                        access to the latest and most innovative products on the 
                        market. Our team has worked tirelessly to curate a 
                        collection of gadgets that meet our high standards of 
                        quality, design, and innovation.
                    </Typography>

                </Grid>
                <br></br>
                <Grid item sm={5} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px', height: '30vh', overflow: 'auto'}} className="svcGrid">
          
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        Your One-Stop-Shop for Gadgets
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        At Gadgets Galore, we're a one-stop-shop for all your 
                        gadget needs. We offer a wide range of products including 
                        smart watches, cameras, mobile phones, and gaming gadgets 
                        from the most trusted brands in the industry. Our products 
                        are carefully selected to provide you with the latest 
                        technology at competitive prices, so you can shop with 
                        confidence.
                    </Typography>

                </Grid>
            </Grid>
            <br></br>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto',}}>
      
                <Grid item sm={5} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px', height: '30vh', overflow: 'auto'}} className="svcGrid">
         
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        Unparalleled Customer Service
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Our mission is to provide you with the best possible 
                        shopping experience. We understand that shopping for 
                        gadgets can be overwhelming, and we're here to help. 
                        Our knowledgeable team is always available to answer your 
                        questions and help you find the perfect gadget to suit 
                        your needs. We're committed to providing unparalleled 
                        customer service, including fast and free shipping, 
                        hassle-free returns, and secure payment options.
                    </Typography>

                </Grid>
                <br></br>
                <Grid item sm={5} sx={{ m: 'auto', boxShadow: 8, bgcolor: 'transparent',  borderRadius: '16px', height: '30vh', overflow: 'auto'}} className="svcGrid">
          
                    <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
                        Start Exploring Today
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        So why wait? Start exploring our store today and 
                        discover the exciting world of gadgets! We're confident 
                        that you'll find something that you'll love, whether 
                        you're a tech enthusiast or just looking for the latest 
                        and greatest gadgets. Thank you for choosing Gadgets 
                        Galore and we look forward to serving you!
                    </Typography>

                </Grid>
            </Grid>
            <br></br>
            <br></br>
        </Box>
  )
}

export default AboutUs