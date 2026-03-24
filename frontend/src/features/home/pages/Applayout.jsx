import Particles from '../components/Particles';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Applayout=()=>{
    return(
        <div className="flex text-white flex-col min-h-screen w-full relative">
            <Navbar/>
            <div className="flex-1 flex flex-col">
                <Outlet/>
            </div>
            <Footer/>

<div style={{ width: '100%', height: '100%',backgroundColor:"black", position: 'absolute',top:0,left:0,zIndex:-1 }}>
  <Particles
    particleColors={["#ffffff"]}
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover
    alphaParticles={false}
    disableRotation={false}
    pixelRatio={1}
/>
</div>
        </div>
        
        
    )
}

export default Applayout