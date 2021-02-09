import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// main: {
//   marginTop: theme.spacing(8),
//   marginBottom: theme.spacing(2),
// },
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={`${classes.root} footer-container`}>
      <div className='footer-navigation-container'>
        <ul>
          <li>
            <NavLink to='/portfolio'>Portfolio</NavLink>
          </li>
          <li>
            <NavLink to='/contact'>Contact</NavLink>
          </li>
          <li>
            <NavLink to='/privacy'>Privacy Policy</NavLink>
          </li>
          <li>
            <NavLink to='/feedback'>FeedBack</NavLink>
          </li>
        </ul>
      </div>
      <div className='copyright-container'>
        <p> &copy; ADSJ 2021</p>
      </div>
    </footer>
  );
}

export default Footer;
