import React from 'react';
import './footer.scss';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="top">
          <div className="logo-details">
            <img src='/homelogo4.jpg'/>
            <span className="logo_name">RealEstate</span>
          </div>
          <div className="media-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="link-boxes">
          <ul className="box">
            <li className="link_name">Company</li>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Get started</a></li>
          </ul>

          <ul className="box">
            <li className="link_name">Services</li>
            <li><a href="#">App design</a></li>
            <li><a href="#">Web design</a></li>
            <li><a href="#">Logo design</a></li>
            <li><a href="#">Banner design</a></li>
          </ul>

          <ul className="box">
            <li className="link_name">Account</li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">My account</a></li>
            <li><a href="#">Preferences</a></li>
            <li><a href="#">Purchase</a></li>
          </ul>

          <ul className="box">
            <li className="link_name">Courses</li>
            <li><a href="#">HTML & CSS</a></li>
            <li><a href="#">JavaScript</a></li>
            <li><a href="#">Photography</a></li>
            <li><a href="#">Photoshop</a></li>
          </ul>

          <ul className="box input-box">
            <li className="link_name">Subscribe</li>
            <li><input type="text" placeholder="Enter your email" /></li>
            <li><input type="button" value="Subscribe" /></li>
          </ul>
        </div>
      </div>

      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">© 2025 CodingLab. All rights reserved</span>
          <span className="policy_terms">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & condition</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
