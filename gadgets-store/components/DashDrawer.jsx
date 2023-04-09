import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';
import CallIcon from '@mui/icons-material/Call';
import PaidIcon from '@mui/icons-material/Paid';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'

const DashDrawer = ({props}) => {
  const { data: session } = useSession()
  const user = session?.user;
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    // const [state, setState] = useState(false);


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
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><HomeIcon/></ListItemIcon>
                  <Link href="/" className='listItem'><ListItemText primary='Home' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><DashboardIcon/></ListItemIcon>
                  <Link href="/admin" className='listItem'><ListItemText primary='Dashboard' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><GroupIcon/></ListItemIcon>
                  <Link href="/admin/UserManagement" className='listItem'><ListItemText primary='User Management' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><InventoryIcon/></ListItemIcon>
                  <Link href="/admin/Inventory" className='listItem'><ListItemText primary='Inventory' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><LocalShippingIcon/></ListItemIcon>
                  <Link href="/admin/AllOrders" className='listItem'><ListItemText primary='Orders' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><PaidIcon/></ListItemIcon>
                  <Link href="/admin/Revenue" className='listItem'><ListItemText primary='Revenue' /></Link>                
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon className='listItem'><MessageIcon/></ListItemIcon>
                  <Link href="/admin/Messages" className='listItem'><ListItemText primary='Messages' /></Link>                
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Box>
    );
  return (
    <div>
    
      <Box sx={{ borderBottom: 1, borderColor: '#7b54bf', bgcolor: 'transparent', overflow: 'auto'}} className="boxBanner">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{m: 'auto', textAlign: 'center'}}>
      
          <Grid item sm={9} sx={{ m: 'auto', overflow: 'auto'}} className="svcGrid">

            <Typography variant="h5" gutterBottom sx={{textAlign: 'center', color: '#7b54bf', }}>
              Admin Dahboard {props}
            </Typography>
          </Grid>
          <br></br>
          <Grid item sm={3} sx={{ m: 'auto', overflow: 'auto'}} className="svcGrid">
            <Box sx={{ '& > :not(style)': { m: 1 }, filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.63))' }}>
              <Fab color="primary" onClick={()=>setState({ ...state, left: true })} sx={{backgroundColor: '#7b54bf', '&:hover': {backgroundColor : '#9256fa'},}} aria-label="add">
                <MenuIcon />
              </Fab>
              {user ?
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
                <MenuItem onClick={handleClose} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}>Profile</MenuItem>
                <MenuItem onClick={handleClose} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}>My account</MenuItem>
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
                <MenuItem onClick={handleClose} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}><Link href="/Login" >Login</Link></MenuItem>
                <MenuItem onClick={handleClose} sx={{color: '#7b54bf' , '&:hover': {color : '#9256fa'},}}><Link href="/Register" >Register</Link></MenuItem>
              </Menu>
              </>
              }
            </Box>
            {/* <Button sx={{marginBottom: 1,}}><MenuIcon onClick={()=>setState({ ...state, left: true })} sx={{cursor: 'pointer', border: 1, borderRadius: '16px', fontSize: '30px'}}/></Button>
            <Button sx={{marginBottom: 1,}}><PersonIcon onClick={()=>setState({ ...state, left: true })} sx={{cursor: 'pointer', border: 1, borderRadius: '16px', fontSize: '30px'}}/></Button> */}
          
          </Grid>
        </Grid>
        
        {/* <Typography variant="h5" gutterBottom sx={{textAlign: 'center' }}>
          Gadgets Galore: Your One-Stop Shop for the Latest Tech
        </Typography>
        <MenuIcon onClick={()=>setState({ ...state, left: true })} sx={{cursor: 'pointer'}}/> */}
      </Box>
        {/* <Button onClick={()=>setState({ ...state, left: true })}>Click Me</Button> */}
        
        <Drawer
          anchor='left'
          open={state.left}
          onClose={()=>setState({ ...state, left: false })}
        >
        {list('left')}
      </Drawer>
      {/* </React.Fragment> */}
   
  </div>
  )
}

export default DashDrawer





