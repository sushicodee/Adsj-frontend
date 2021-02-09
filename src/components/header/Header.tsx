import React, { useState, useContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import Grid from '@material-ui/core/Grid';
import {
  makeStyles,
  Theme,
  fade,
  createStyles,
} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { AuthContext } from 'context/authContext';
import Logo from 'components/common/logo/Logo';
import OptionsTray from './components/OptionsTray';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import ImageIcon from '@material-ui/icons/Image';
// import OptionsTray from "./optionsTray/OptionsTray";
// import {ArrowBack} from '@material-ui/icons';

interface IHeaderLink {
  name: string;
  path: string;
  icon: any;
}

interface IProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  })
);

const Header: React.FC<IProps> = (props) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);
  const { user, fetchProfile } = useContext(AuthContext);
  // const [toggleSearch, settoggleSearch] = useState(false);
  // const [searchQuery, setsearchQuery] = useState('');

  // const handleShowSearch = () => {
  //   settoggleSearch((prevState) => !prevState);
  // };
  const headerLinks: IHeaderLink[] = [
    // { name: 'Dashboard', path: '/dashboard', iconName: 'Dashboard' },
    { name: 'Portfolio', path: '/portfolio', icon: HomeIcon },
    { name: 'Blogs', path: '/blogs', icon: BookIcon },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
  ];

  return (
    <>
      <AppBar color='transparent' className='header-wrapper'>
        <Toolbar className='header-container'>
          <>
            <IconButton
              edge='start'
              onClick={() => settoggle((cur: boolean) => !cur)}
              className='menu-button'
            >
              <MenuIcon />
            </IconButton>
            <Logo />
            {!user ? (
              <Grid className='default-header-auth container'>
                <Link to='/login'>
                  <Button size='small' variant='contained' color='primary'>
                    Sign In
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button size='small' variant='contained' color='secondary'>
                    Sign Up
                  </Button>
                </Link>
              </Grid>
            ) : (
              <OptionsTray />
            )}
          </>
        </Toolbar>
      </AppBar>
      {/* //sidenav */}
      <aside
        className={clsx(classes.list, {
          [classes.fullList]: 'top',
        })}
        role='presentation'
      >
        <SwipeableDrawer
          className={`${classes.fullList} sidebar-wrapper`}
          anchor={'left'}
          open={toggle}
          onClose={() => settoggle(false)}
          onOpen={() => settoggle(true)}
        >
          <div className='sidebar-container wrapper'>
            {headerLinks.map(({ name, path, icon }, index) =>
              name === 'divider' ? (
                <Divider key={name + index} />
              ) : (
                <List
                  key={name}
                  className={`${classes.list} header-link container`}
                >
                  <NavLink
                    key={name}
                    to={path}
                    onClick={() => settoggle(false)}
                  >
                    <ListItem>
                      <icon />
                      <ListItemText primary={name} />
                    </ListItem>
                  </NavLink>
                </List>
              )
            )}
          </div>
        </SwipeableDrawer>
      </aside>
    </>
  );
};
export default Header;
