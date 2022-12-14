import Head from 'next/head';
import { AiOutlineMenu, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';

const Loading = () => {
  return (
    <>
      <Head>
        <title>BeZen</title>
        <meta name='description' content='Website' />
        <link rel='icon' href='' />
      </Head>
      <main className='absolute w-full h-full flex flex-col items-center'>
        <section className='w-80'>
          <header className='h-12 px-4 rounded-lg shadow flex items-center justify-between border'>
            <section className='flex items-center justify-between w-full'>
              <AiOutlineMenu className='text-slate-500 text-xl cursor-pointer' />
              <h1 className='font-semibold'>BeZen</h1>
              <AiOutlineAppstoreAdd className='text-slate-500 text-2xl cursor-pointer' />
            </section>
          </header>
        </section>
        <section className='mt-36'>
          <CgSpinner className='text-9xl text-slate-200 animate-spin' />
        </section>
      </main>
    </>
  );
};

export default Loading;
