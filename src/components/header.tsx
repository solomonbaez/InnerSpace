import React, { forwardRef, ForwardedRef } from 'react';
import Diamond from "@/components/diamond"

interface HeaderProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

const Header = forwardRef<ForwardedRef<HTMLDivElement>, HeaderProps>(
  function index(props, ref) { 
    const { isActive, setIsActive } = props;

    return (
      <>
        <button
        className="fixed top-10 right-10 w-20 z-30 h-20 flex items-center justify-center"
        onClick={() => setIsActive(!isActive)}
        >
          <div ref={ref} className="fixed top-10 right-10 h-20 w-20 z-10 rounded-full bg-white hover:scale-150" />
          <Diamond isActive={isActive} />
        </button>
      </>
    );
})

export default Header;
  