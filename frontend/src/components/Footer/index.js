import React from 'react';
import './Footer.css';


function Footer() {
    return (
        <div id='footer-container'>
            {/* <h1>salfjdaskl</h1> */}
            <div id='footer-links'>
                <p>Created by Eddie Verdusco</p>
                <a className='footer-link'  href='https://github.com/verduscos' target="_blank" ><i class="fab fa-github-square"></i></a>
                <a className='footer-link' href='https://www.linkedin.com/in/eddie-verdusco/' target='_blank'><i class="fab fa-linkedin"></i></a>
            </div>
            <p>JavaScript | React | Redux | Node.js | Express.js | HTML | CSS</p>
        </div>
    )
}

export default Footer;
