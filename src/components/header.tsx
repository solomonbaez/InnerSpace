import React, { ForwardedRef, forwardRef } from 'react';
import Diamond from "@/components/diamond"
import MagneticGSAP from "@/components/magneticGSAP"

interface HeaderProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLButtonElement, HeaderProps>(function Index(props: HeaderProps, ref) {
    const { isActive, setIsActive } = props;

    return (
      <>
      <button ref={ref}
      className="fixed top-10 right-0 w-20 z-30 h-20 flex box-border mix-blend-difference items-center justify-center"
      onClick={() => setIsActive(!isActive)}
      >
        <MagneticGSAP>
          <Diamond key="menu" isActive={isActive}/>
        </MagneticGSAP>
      </button>
      </>
    );
})

export default Header;
  