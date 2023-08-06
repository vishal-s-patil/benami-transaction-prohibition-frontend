import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider]= useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] =useState(null)
  const [homes, setHomes] = useState([])
  const [home, setHome] =useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async ()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // setAccount(accounts[0])
    // console.log(accounts[0])
    //const realEstate = new ethers.Contract(config[network.chainID].realEstate.address,RealEstate, provider)
    const totalSupply = await RealEstate.totalSupply()
    const homes =  []

    for (var i=1;i<= totalSupply;i++){
      const uri= await RealEstate.tokenURI(i)
      const response = await fetch(uri)
      const metadata = await response.json()
      homes.push(metadata)
    }

    setHomes(homes)
    console.log(homes)
   
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])




  const togglePop = () => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true)
  }


 return (
    <div>

      <Navigation /*account={account} setAccount={setAccount}*/ />

      <Search />
      <div className='cards__section'>

        <h3>Homes for you</h3>
        <hr />
        <div className='cards'>
          

            <div className='card' onClick={()=> togglePop(home)}>
            <div className='card__image'>
              <img src="" alt="Home"/>
            </div>
            <div className='card__info'>
              <h4>1 ETH</h4>
              <p>
                <strong>1</strong>beds
                <strong>2</strong>bath
                <strong>3</strong>sqft
              </p>
              <p>E city</p>

            </div>
          </div>




          <div className='card' onClick={()=> togglePop(home)}>
            <div className='card__image'>
              <img src="" alt="Home"/>
            </div>
            <div className='card__info'>
              <h4>1 ETH</h4>
              <p>
                <strong>1</strong>beds
                <strong>2</strong>bath
                <strong>3</strong>sqft
              </p>
              <p>E city</p>

            </div>
          </div>





          <div className='card' onClick={()=> togglePop(home)}>
            <div className='card__image'>
              <img src="" alt="Home"/>
            </div>
            <div className='card__info'>
              <h4>1 ETH</h4>
              <p>
                <strong>1</strong>beds
                <strong>2</strong>bath
                <strong>3</strong>sqft
              </p>
              <p>E city</p>

            </div>
          </div>

          
          
        </div>

      </div>

      {toggle  && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
      )}


    </div>
  );
}

export default App;
