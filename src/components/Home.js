import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';

const Home = ({ home, provider, escrow, togglePop }) => {

    return (
        <div className="home">
              <div className='home__details'>
                 <div className="home__image">
                     <img src={home.image} alt="Home" /> 

                </div>

                 <div className="home__overview">
                    <h1>A mansion</h1>
                 <p>
                    <strong>2</strong> bds |
                    <strong>1</strong> ba |
                    <strong>2200</strong> sqft
                </p>
                <p>E city</p>
                <h2>30 ETH </h2> 
                
                <div>
                    <button classname='home__buy' /*onClick={buyHandler} disabled={{hasBought}}*/>
                        Buy
                    </button>
                </div>


                <button classNAme='home__contact'>
                    contact agent
                </button>

                <hr />

                <h2>Overview</h2>

                <p>
                    home description
                </p>

                <hr />

                <h2>facts and features</h2>

                <ul>
                    <li>khire</li>
                    <li>hdccuh</li>
                    <li>jgciu</li>
                    <li>hdwhi</li>
                    <li>hdccuh</li>
                    <li>jgciu</li>
                    <li>hdwhi</li>
                </ul>

                </div>

                      <button onClick={togglePop} className="home__close">
                        <img src={close} alt="Close" />
                    </button>    
                
            </div> 
        </div> 
        
    );
}

export default Home;
