import React from 'react';
import './aboutpage.scss';
import { Link } from 'react-router-dom';

function Aboutpage() {
  return (
    <div className="aboutSection">
    <div className="aboutHeader">
        <div className="overlay"></div>
        <div className="content">
            <h1>About Our Mission</h1>
            <p>We aim to build a better future together.</p>
        </div>
    </div>

    <div className='aboutMainsection'>
        <div className="mainrow">
            <div className="maincolumn">
                <div className="maincard">
                    <img src="/about1.png" alt="" />
                    <h4>We'll Find You The Perfect Spacee</h4>
                    <p className="desc">
                    Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus
                    </p>
                </div>
            </div>
            <div className="maincolumn">
                <div className="maincard">
                    <img src="/about2.png" alt="" />
                    <h4> We Work With Your Budget</h4>
                    <p className="desc">
                    Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus
                    </p>
                </div>
            </div>
            <div className="maincolumn">
                <div className="maincard">
                    <img src="/about3.png" alt="" />
                    <h4>List Your Property Risk Free</h4>
                    <p className="desc">
                    Quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus
                    </p>
                </div>
            </div>
        </div>
    </div>

      <div className='storySection'>
            <h2>Our Story</h2>
            <p>
            At Real Estate2, we believe that finding the right home is more than just a transaction—it's a life-changing experience. Our journey began with a simple mission: to simplify the home discovery process and bring transparency, trust, and technology into Indian real estate.

What started as a passion project by a team of tech enthusiasts and property experts has grown into a trusted platform helping people find homes that truly fit their needs—whether it's an urban apartment in Bangalore, a cozy flat in Amritsar, or a luxury villa in Hyderabad.

We're not just building a property listing site—we're building a movement toward smarter, safer, and more accessible real estate experiences for everyone. With features like fraud detection, real-time listings, and user-friendly design, we’re transforming the way people rent, buy, and sell homes in India.

Join us as we redefine what it means to find your place in the world.
            </p>
      </div>

      <h2 className='heading'>Our Team</h2>
      <div className="row">
        <div className="column">
          <div className="card">
            <img src="/avatar1.png" alt="Jane" />
            <div className="container">
              <h2>Jane Doe</h2>
              <p className="title">CEO & Founder</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src="/avatar2.png" alt="Mike"  />
            <div className="container">
              <h2>Mike Ross</h2>
              <p className="title">Art Director</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src="/avatar3.png" alt="John"/>
            <div className="container">
              <h2>John Doe</h2>
              <p className="title">Designer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutFooter">
        <div className="overlay"></div>
        <div className='footerContent'>
            <h1>START YOUR SEARCH TODAY</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nisi, ut nesciunt rerum at explicabo quod similique beatae. Exercitationem, et.</p>
            <Link to="/list">
                <button>See Properties</button>
            </Link> 
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;
