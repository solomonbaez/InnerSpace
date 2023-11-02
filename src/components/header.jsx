import React, { forwardRef } from 'react';
import Diamond from "@/components/diamond"
import MagneticGSAP from "@/components/magneticGSAP"

const Header = forwardRef( function index(props, ref) {
    const { isActive, setIsActive } = props;

    return (
      <button ref={ref}
      className="fixed top-10 right-10 w-20 z-30 h-20 flex box-border mix-blend-difference items-center justify-center"
      onClick={() => setIsActive(!isActive)}
      >
        <MagneticGSAP>
          <Diamond key="menu" isActive={isActive}/>
        </MagneticGSAP>
      </button>
    );
})

export default Header;
  