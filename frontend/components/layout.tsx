import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  toolbar?: {
    title: string;
    hasBackBtn?: boolean;
    rightBtn?: {
      item: React.ReactNode;
      onClick?: () => void;
    };
  };
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ toolbar, children }) => {
  const router = useRouter();
  return (
    <div className='bg-[#d9d9d9] w-full h-screen flex justify-center items-center'>
      <div className='relative w-360 h-640 bg-white rounded-2 overflow-hidden'>
        {toolbar && (
          <div className='relative w-full h-50 bg-carrot flex justify-center items-center'>
            <span className=' text-white text-18 font-semibold'>{toolbar.title}</span>
            {toolbar.hasBackBtn && (
              <button onClick={() => router.back()} className=' absolute left-16 top-10 text-20 text-white'>
                ←
              </button>
            )}
            {toolbar.rightBtn && (
              <button className=' absolute right-16 top-10' onClick={toolbar.rightBtn.onClick}>
                {toolbar.rightBtn.item}
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Layout;
