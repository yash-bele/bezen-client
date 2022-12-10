import { useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AiOutlineMenu, AiOutlineBulb } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import {
  MdLabelOutline,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from 'react-icons/md';
import { MdOutlineNewLabel } from 'react-icons/md';

const Menu = ({ setShowMenu, setShowTag, data, setData, tags, setTags }) => {
  const ref = useRef(null);
  const [tag, setTag] = useState('');

  const handleFocus = () => {
    ref.current.focus();
  };

  const patchTag = async (e) => {
    e.preventDefault();
    const trimTag = tag
      .split(' ')
      .filter((i) => i !== '')
      .join(' ');
    if (!trimTag) return toast.error('Enter tag');
    if (tags.includes(trimTag)) return toast.error('Tag already exists');
    setTag('');
    const tagsx = [...tags, trimTag];
    setTags(tagsx);
    const datax = { ...data, tags: tagsx };
    setData(datax);
    await axios.patch(`https://bezen-server.vercel.app/1`, datax);
  };

  return (
    <main className='h-full'>
      <section className='w-fit h-12 px-4 rounded-lg shadow-md flex items-center justify-between'>
        <AiOutlineMenu
          onClick={() => setShowMenu(false)}
          className='text-slate-500 text-xl cursor-pointer'
        />
      </section>
      <section className='mt-10 h-[80%] border border-slate-300 rounded-lg overflow-y-scroll scrollbar-thin hover:scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full cursor-default'>
        <div
          onClick={() => {
            setShowMenu(false);
            setShowTag('');
          }}
          className='flex items-center space-x-5 cursor-pointer hover:bg-slate-100 p-3 rounded-r-3xl'
        >
          <AiOutlineBulb className='text-2xl text-slate-500' />
          <p>Notes</p>
        </div>
        {tags.map((i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setShowMenu(false);
                setShowTag(i);
              }}
              className='flex items-center space-x-5 cursor-pointer hover:bg-slate-100 p-3 rounded-r-3xl'
            >
              <MdLabelOutline className='text-2xl text-slate-500' />
              <p>{i}</p>
            </div>
          );
        })}
        <form
          onSubmit={patchTag}
          onClick={handleFocus}
          className='flex items-center space-x-5 cursor-pointer p-3 rounded-r-3xl'
        >
          <MdOutlineNewLabel className='text-3xl text-slate-500' />
          <input
            ref={ref}
            spellCheck='false'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            type='text'
            placeholder='Enter tag & press enter'
            className='outline-none bg-transparent h-full w-full'
          />
        </form>
        {/* <div className='flex items-center space-x-5 cursor-pointer hover:bg-slate-200 p-3 rounded-r-3xl'>
          <FiTrash className='text-xl text-slate-500' />
          <p>Bin</p>
        </div> */}
        {/* <div className='flex items-center space-x-5 cursor-pointer hover:bg-slate-100 p-3 rounded-r-3xl'>
          <MdOutlineDarkMode className='text-2xl text-slate-500' />
          <p>Dark Mode</p>
        </div> */}
      </section>
      <ToastContainer position='top-center' theme='colored' />
    </main>
  );
};

export default Menu;
