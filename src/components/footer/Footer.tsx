import React from 'react'
import {NavLink} from 'react-router-dom';

function Footer() {
    return (
        <div className = 'footer-container'>
                <div className="footer-navigation-container">
                    <ul>
                        <li>
                            <NavLink to = '/portfolio'>Portfolio</NavLink>
                        </li>
                        <li>
                            <NavLink to = '/contact'>Contact</NavLink>
                        </li>
                        <li>
                            <NavLink to = '/privacy'>Privacy Policy</NavLink>
                        </li>
                        <li>
                            <NavLink to = '/feedback'>FeedBack</NavLink>
                        </li>                   
                    </ul>
                </div>
                <div className="copyright-container">
                    <p> &copy; ADSJ 2020</p>
                </div>
            </div>
    )
}

export default Footer;
