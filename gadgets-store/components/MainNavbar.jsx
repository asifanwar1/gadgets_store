import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import CallIcon from '@mui/icons-material/Call';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react"
import MyAccount from './MyAccount';

const MainNavbar = () => {
  const { data: session } = useSession()
  const user = session?.user;
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // profile menu 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <Box
        sx={{ width: 250, height:'100%', backgroundColor: '#c8f0e6',}}
        role="presentation"
        onClick={()=>setState(false)}
        onKeyDown={()=>setState(false)}
      >
        <List>         
            <ListItem  disablePadding className='listDrawer'>
              <ListItemButton>
                <ListItemIcon className='listItem'><HomeIcon/></ListItemIcon>
                  <Link href="/" className='listItem'><ListItemText primary='Home'/></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><InfoIcon/></ListItemIcon>
                  <Link href="#AboutUs" className='listItem'><ListItemText primary='About Us' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><InventoryIcon/></ListItemIcon>
                  <Link href="/Products" className='listItem'><ListItemText primary='Products' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><CallIcon/></ListItemIcon>
                  <Link href="/ContactUs" className='listItem'><ListItemText primary='Contact Us' /></Link>                
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />


        <List> 
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon className='listItem'><ShoppingCartIcon/></ListItemIcon>
                <Link href="/Cart" className='listItem'><ListItemText primary='Cart' /></Link>                
              </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon className='listItem'><FavoriteBorderIcon/></ListItemIcon>
                <Link href="/Cart" className='listItem'><ListItemText primary='Wish List' /></Link>                
              </ListItemButton>
          </ListItem>
        </List> 
        <Divider />

        {user ?
        <List>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon className='listItem'><LocalShippingIcon/></ListItemIcon>
                <Link href="/Order" className='listItem'><ListItemText primary='My Orders' /></Link>             
              </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon className='listItem'><LogoutIcon/></ListItemIcon>
                <ListItemText primary='Logout' onClick={() => signOut()} className='listItem'/>             
              </ListItemButton>
          </ListItem>
        </List>
        :
        <List>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon className='listItem'><LoginIcon/></ListItemIcon>
                <Link href="/Login" className='listItem'><ListItemText primary='Login' /></Link>                
              </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon className='listItem'><AppRegistrationIcon/></ListItemIcon>
                <Link href="/Register" className='listItem'><ListItemText primary='Register' /></Link>                
              </ListItemButton>
          </ListItem>
        </List>
        }
      </Box>
    );

    // if (user?.role !== "admin"){
    //   console.log("user")
    //   console.log(user.role)
    // }
    // else{
    //   console.log("nhe")
    // }
  return (
    <div>
    
      <Box sx={{ borderBottom: 1, borderColor: '#7b54bf', bgcolor: 'transparent', overflow: 'auto'}} className="boxBanner">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto', textAlign: 'center'}}>
      
          <Grid item sm={9} sx={{ m: 'auto', overflow: 'auto', filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))'}} className="svcGrid">

            <Typography variant="h5" gutterBottom sx={{textAlign: 'center', color: '#7b54bf', }}>
              Gadgets Galore: Your One-Stop Shop for the Latest Tech
            </Typography>
          </Grid>
          <br></br>
          <Grid item sm={3} sx={{ m: 'auto', overflow: 'auto'}} className="svcGrid">
            <Box sx={{ '& > :not(style)': { m: 1 }, filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))' }}>
              <Fab color="primary" onClick={()=>setState({ ...state, left: true })} aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                <MenuIcon />
              </Fab>
              <Fab color="primary" aria-label="add" sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                  
                  <Link href="/Cart" ><ShoppingCartIcon sx={{color: 'white'}}/></Link> 
              </Fab>
              {user ?
              <>
              <Fab color="primary" aria-label="add" id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{backgroundColor: '#7b54bf' ,'&:hover': {backgroundColor : '#9256fa',},}}>
                <PersonIcon />
              </Fab>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                
              >
                {/* <MenuItem onClick={handleClose} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}>Profile</MenuItem> */}
                {/* <MenuItem onClick={handleClose} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}>My account</MenuItem> */}
                <MyAccount/>
                <MenuItem onClick={() => signOut()} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}>Logout</MenuItem>
              </Menu>
              </>
              :
              <>
              <Fab color="primary" aria-label="add" id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}}>
                <PersonIcon />
              </Fab>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}><Link href="/Login" className='listItem'>Login</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link href="/Register" className='listItem'>Register</Link></MenuItem>
              </Menu>
              </>
              }
              
            </Box>
          </Grid>
        </Grid>
        
      </Box>
        
        <Drawer
          anchor='left'
          open={state.left}
          onClose={()=>setState({ ...state, left: false })}

        >
        {list('left')}
      </Drawer>
   
  </div>
  )
}

export default MainNavbar






