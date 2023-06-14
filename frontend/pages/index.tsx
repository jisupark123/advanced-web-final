import Layout from '@/components/layout';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Index() {
  return (
    <Layout>
      <main className=' pl-50 pr-50 pt-145'>
        <h2 className=' text-30 font-bold'>냉장고를</h2>
        <h2 className=' text-30 font-bold mb-80'>부탁해!</h2>
        <div className='flex flex-col items-center'>
          <form autoComplete='off' className=' flex flex-col items-center gap-10 mb-20'>
            <input
              type='email'
              placeholder='Email'
              className='w-260 pt-15 pb-15 pl-20 pr-20 border-1 border-solid border-carrot box-border rounded-100'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-260 pt-15 pb-15 pl-20 pr-20 border-1 border-solid border-carrot box-border rounded-100'
            />
            <button className='text-white text-14 bg-carrot w-130 pt-10 pb-10 pr-40 pl-40 rounded-100 font-semibold'>
              Login
            </button>
          </form>
          <div className='mb-20'>Or</div>
          <div className='w-260 pt-15 pb-15 pl-20 pr-20 bg-[#F6E24B] box-border rounded-12 flex justify-center items-center cursor-pointer'>
            <span>카카오톡으로 시작하기</span>
          </div>
        </div>
      </main>
    </Layout>
  );
}
