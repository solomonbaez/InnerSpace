import React, { forwardRef } from 'react';
import Diamond from "@/components/diamond"
import MagneticGSAP from "@/components/magneticGSAP"

interface HeaderProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = forwardRef<HTMLButtonElement, HeaderProps>(function Index(props: HeaderProps, ref) {
    const { isActive, setIsActive } = props;

    return (
      <button ref={ref}
      className="fixed top-5 right-5 w-20 z-40 h-10 p-10 mix-blend-difference inline-flex flex-col justify-start items-center "
      onClick={() => setIsActive(!isActive)}
      >
        <div className='flex flex-row items-center justify-end'>
        <div className='fixed-1'>
        <MagneticGSAP>
          <Diamond key="menu" isActive={isActive}/>
        </MagneticGSAP>
        </div>
        </div>
      </button>
    );
})

export default Header;
  