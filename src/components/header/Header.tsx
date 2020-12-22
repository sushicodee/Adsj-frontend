import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import "./Header.scss";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  Theme,
  fade,
  createStyles,
} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import { useDispatch } from "react-redux";
// import OptionsTray from "./optionsTray/OptionsTray";
// import {ArrowBack} from '@material-ui/icons';

interface IHeaderLink {
  name: string;
  path: string;
  iconName: string;
}

interface IProps {
  isLoggedin?: boolean;
  // logout?:() => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

const Header: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);
  const [toggleSearch, settoggleSearch] = useState(false);
  const [searchQuery, setsearchQuery] = useState('');
  const { isLoggedin } = props;
  
  const handleShowSearch = () => {
    settoggleSearch(prevState => (!prevState))
  }

  const headerLinks: IHeaderLink[] = [
    { name: "Home", path: "/", iconName: "home" },
    { name: "Dashboard", path: "/dashboard", iconName: "dashboard" },
    { name: "Portfolio", path: "/portfolio", iconName: "portfolio" },
    { name: "Contact", path: "/contact", iconName: "contact" },
    { name: "Gallery", path: "/gallery", iconName: "gallery" },
    { name: "About", path: "/about", iconName: "about" },
    { name: "divider", path: "", iconName: "" },
    { name: "Add Post", path: "/add-product", iconName: "add" },
  ];

  return (
    <>
      <AppBar color="transparent" className="header-wrapper">
        <Toolbar className="header-container">
          <>
              <IconButton
                edge="start"
                onClick={() => settoggle((cur: boolean) => !cur)}
                className="menu-button"
              >
                <MenuIcon />
              </IconButton>
            <div className="logo">
              <svg
                width="150"
                height="50"
                viewBox="0 0 500 92.715233349583"
                className="css-1j8o68f"
              >
                <defs id="SvgjsDefs1296">
                  <linearGradient id="SvgjsLinearGradient1301">
                    <stop
                      id="SvgjsStop1302"
                      stopColor="#945f50"
                      offset="0"
                    ></stop>
                    <stop
                      id="SvgjsStop1303"
                      stopColor="#fcc5b3"
                      offset="0.5"
                    ></stop>
                    <stop
                      id="SvgjsStop1304"
                      stopColor="#945f50"
                      offset="1"
                    ></stop>
                  </linearGradient>
                  <linearGradient id="SvgjsLinearGradient1305">
                    <stop
                      id="SvgjsStop1306"
                      stopColor="#945f50"
                      offset="0"
                    ></stop>
                    <stop
                      id="SvgjsStop1307"
                      stopColor="#fcc5b3"
                      offset="0.5"
                    ></stop>
                    <stop
                      id="SvgjsStop1308"
                      stopColor="#945f50"
                      offset="1"
                    ></stop>
                  </linearGradient>
                </defs>
                <g
                  id="SvgjsG1297"
                  transform="matrix(2.2075055559424523,0,0,2.2075055559424523,-2.649002035599968,-39.735100006964146)"
                  fill="url(#SvgjsLinearGradient1301)"
                ></g>
                <g
                  id="SvgjsG1298"
                  transform="matrix(2.3672409340227674,0,0,2.3672409340227674,120.73975647066685,-28.010721232600858)"
                  fill="url(#SvgjsLinearGradient1305)"
                >
                  <path d="M28.237 39.38983 c0.16916 0.33932 0.067797 0.61017 -0.30508 0.61017 l-3.0847 0 c-0.30508 0 -0.47424 -0.13526 -0.57593 -0.37288 l-2.1017 -4.4068 l-14.61 0 l-2.0678 4.4068 c-0.13559 0.23762 -0.30508 0.37288 -0.57627 0.37288 l-3.1186 0 c-0.33898 0 -0.50847 -0.27085 -0.37288 -0.61017 l12.78 -26.373 c0.10169 -0.23729 0.27119 -0.30508 0.44068 -0.30508 l0.44035 0 c0.16949 0 0.30508 0.067797 0.44068 0.30508 z M9.2207 31.7292 l11.288 0 l-5.6271 -12 z M41.35591525423729 12.882000000000001 c9.0169 0 13.865 6.9834 13.865 13.424 c0 7.0847 -4.8814 13.695 -13.831 13.695 l-9.0847 0 c-0.33932 0 -0.57661 -0.23729 -0.57661 -0.57627 l0 -26 c0 -0.30508 0.20339 -0.54237 0.54237 -0.54237 l9.0847 0 z M41.457915254237285 36.3058 c6.2712 0 9.8647 -4.9153 9.8308 -10.034 c0 -5.0169 -3.458 -9.6949 -9.8308 -9.6949 l-5.9322 0 l0.033898 19.729 l5.8983 0 z M58.77964576271186 35.3559 l1.4915 -1.6953 c0.37288 -0.40678 0.77966 -0.40678 1.0844 -0.16949 c0.91559 0.77966 3.2207 3.0847 6.3054 3.0847 c3.3898 0 5.4237 -1.6271 5.4237 -3.8644 c0 -2.7797 -3.0515 -3.5593 -5.9668 -4.678 c-4.4407 -1.7627 -7.9661 -3.7288 -7.9661 -7.9661 c0 -3.4576 2.5424 -7.3898 8.6441 -7.3898 c4.1695 0 7.1864 2.4068 8.0339 3.2203 c0.30508 0.30508 0.47458 0.71186 0.20339 1.0508 l-1.322 1.7288 c-0.27119 0.37322 -0.64407 0.50881 -1.0847 0.20372 c-0.88136 -0.67797 -2.9831 -2.5763 -5.7966 -2.5763 c-3.0508 0 -4.8475 1.6949 -4.8475 3.7627 c0 2.339 2.2373 3.2881 5.4241 4.5085 c4.0678 1.6271 8.4746 3.5254 8.4746 8.1695 c0 3.9661 -3.7963 7.4912 -9.1861 7.4912 c-4.8814 0 -7.8983 -3.1522 -8.7458 -3.9658 c-0.27119 -0.23729 -0.50847 -0.54203 -0.16949 -0.91525 z M84.54207966101694 12.882000000000001 c0.84746 0 1.3217 0.57559 1.3217 1.3553 l0 28.779 c-0.033898 3.322 -1.8305 5.9664 -4.4407 7.3563 c-0.37288 0.16949 -0.61051 0.13559 -0.77966 -0.16949 l-1.2881 -2.4746 c-0.16916 -0.33865 -0.10136 -0.57627 0.27152 -0.71186 c1.4237 -0.81356 2.4068 -2.2031 2.4068 -4.1014 l0 -27.661 c-0.033898 -0.74576 -0.13559 -1.1864 -0.20339 -1.6949 c-0.067797 -0.37288 0.033898 -0.67797 0.37288 -0.67797 l2.339 0 z"></path>
                </g>
              </svg>
            </div>

            {!isLoggedin ? (
              <Grid className="default-header-auth container">
                <Link to="/login">
                  <Button variant="contained" color = 'primary'>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button  variant="contained" color="secondary">Sign Up</Button>
                </Link>
              </Grid>
            ) : (null
            //   <OptionsTray />
            )}
          </>
        </Toolbar>
      </AppBar>
      {/* //sidenav */}
        <aside
          className={clsx(classes.list, {
            [classes.fullList]: "top",
          })}
          role="presentation"
        >
          <SwipeableDrawer
            className={`${classes.fullList} sidebar-wrapper`}
            anchor={"left"}
            open={toggle}
            onClose={() => settoggle(false)}
            onOpen={() => settoggle(true)}
          >
            <div className="sidebar-container wrapper">
              {headerLinks.map(({ name, path, iconName }, index) =>
                name === "divider" ? (
                  <Divider key={name + index} />
                ) : (
                  <List
                    key={name}
                    className={`${classes.list} header-link container`}
                  >
                    <Link key={name} to={path} onClick={() => settoggle(false)}>
                      <ListItem>
                        <ListItemIcon>
                          <Icon>{iconName}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItem>
                    </Link>
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
