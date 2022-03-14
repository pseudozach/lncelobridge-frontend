import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import { navigation } from '../../actions';
import { network, boltzOnion } from '../../constants';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import LogoutIcon from '@mui/icons-material/Logout';

const boltz_logo = require('../../asset/icons/favicon.ico');

const pages = ['Swap', 'Refund', 'FAQ'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const DeskTopNavigationBar = ({classes}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [userAddress, setUserAddress] = React.useState('Wallet Address');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNav = (page) => {
    console.log('navbar page: ', page.target.textContent);
    switch (page.target.textContent) {
      case 'Swap':
        navigation.navHome()
        break;

      case 'Refund':
        navigation.navRefund()
        break;

      case 'FAQ':
        navigation.navFaq()
        break;
      
      default:
        break;
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: '#304740'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex', cursor:'pointer', } }}
            onClick={() => navigation.navHome()}
          >
          <img
            src={boltz_logo}
            height={40}
            width={40}
            className={classes.img}
            alt="logo"
          />
          <span className={classes.logoText}>Bosphorus.Exchange</span>
          <span className={classes.subLogoText}>beta</span>
          {/* {network}  */}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} 
                  // onClick={handleCloseNavMenu}
                  onClick={handleNav}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: 'pointer', }}
            onClick={() => navigation.navHome()}
          >
            BOSPHORUS
          </Typography>
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end ', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleNav}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button className={classes.outlineButtons}>{userAddress}</Button>
            {show && <Button className={classes.outlineButtons}><LogoutIcon color="disabled" /></Button>}
          </ButtonGroup> */}

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}


        </Toolbar>
      </Container>
    </AppBar>
  );
};









// export default function DeskTopNavigationBar() {






//   return (

//     <Popover>
//       <PopoverTrigger>...</PopoverTrigger>
//       <PopoverContent>...</PopoverContent>
//     </Popover>

// )}

// const DeskTopNavigationBar = ({ classes }) => (

//   <Toolbar.Root>

//   <Toolbar.Button
//     onClick={() => navigation.navHome()}
//     >button

//   </Toolbar.Button>

//   <Toolbar.Separator />

//   <Toolbar.Link>Some link</Toolbar.Link>

// </Toolbar.Root>

  // <View className={classes.wrapper}>
  //   <View className={classes.logo} onClick={() => navigation.navHome()}>
  //     <img
  //       src={boltz_logo}
  //       height={40}
  //       width={40}
  //       className={classes.img}
  //       alt="logo"
  //     />
  //     <span className={classes.logoText}>Bosphorus.Exchange</span>
  //     <span className={classes.subLogoText}>{network} beta</span>
  //   </View>
  //   <View className={classes.buttons}>
  //     <Button
  //       className={classes.responsiveBtn}
  //       text="Swap"
  //       onPress={() => navigation.navHome()}
  //     />
  //     <Button
  //       className={classes.responsiveBtn}
  //       text="Refund"
  //       onPress={() => navigation.navRefund()}
  //     />
  //     <Button
  //       className={classes.responsiveBtn}
  //       text="FAQ"
  //       onPress={() => navigation.navFaq()}
  //     />
  //     <Button
  //       className={classes.responsiveBtn}
  //       external
  //       text="Onion URL"
  //       to={boltzOnion}
  //     />
  //     <Button
  //       className={classes.responsiveBtn}
  //       external
  //       text="Twitter"
  //       to="https://twitter.com/boltzhq"
  //     />
  //     <Button
  //       className={classes.responsiveBtn}
  //       external
  //       text="API"
  //       to="https://docs.boltz.exchange/en/latest/"
  //     />
  //     <Button
  //       className={classes.responsiveBtn}
  //       external
  //       text="Github"
  //       to="https://github.com/pseudozach/lncelobridge"
  //     />
  //   </View>
  // </View>
// );

const styles = theme => ({
  outlineButtons: {
    color: 'white !important', 
    border: '1px solid #303b47 !important',
    '&:hover': {
      color: 'white !important', 
      border: '1px solid #303b47 !important',
    }
  },
  wrapper: {
    flex: '1 1 content',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 425px)': {
      flexDirection: 'column',
    },
  },
  buttons: {
    marginRight: '10%',
    '@media (max-width: 425px)': {
      marginRight: '0%',
      justifyContent: 'space-around',
    },
  },
  logo: {
    width: 'auto',
    height: 'auto',
    margin: '20px',
    cursor: 'pointer',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  responsiveBtn: {
    '@media (max-width: 320px)': {
      fontSize: '20px',
    },
  },
  img: {
    alignSelf: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: '24px',
    fontfamily: 'SFProText',
    margin: '2px',
    fontWeight: '400',
  },
  subLogoText: {
    color: '#fff',
    fontSize: '8px',
    fontWeight: '100',
    textTransform: 'uppercase',
  },
});

DeskTopNavigationBar.propTypes = {
  classes: PropTypes.object,
};

export default injectSheet(styles)(DeskTopNavigationBar);
