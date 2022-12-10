import { AiOutlineMenu, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

const Header = ({ setShowMenu, showTag, setShowAdd, setShowEditTag }) => {
  return (
    <>
      {!showTag && (
        <header className='h-12 px-4 rounded-lg shadow-md flex items-center justify-between'>
          <section className='flex items-center justify-between w-full'>
            <AiOutlineMenu
              onClick={() => setShowMenu(true)}
              className='text-slate-500 text-xl cursor-pointer'
            />
            <h1 className='font-semibold'>BeZen</h1>
            <AiOutlineAppstoreAdd
              onClick={() => setShowAdd(true)}
              className='text-slate-500 text-2xl cursor-pointer'
            />
          </section>
        </header>
      )}
      {showTag && (
        <header className='h-12 px-4 rounded-lg shadow-md flex items-center justify-between'>
          <section className='flex items-center justify-between w-full'>
            <AiOutlineMenu
              onClick={() => setShowMenu(true)}
              className='text-slate-500 text-xl cursor-pointer'
            />
            <h1 className='font-semibold'>{showTag}</h1>
            <div className='flex items-center space-x-4'>
              <FaRegEdit
                onClick={() => setShowEditTag({ edit: showTag, del: '' })}
                className='text-slate-500 text-xl cursor-pointer'
              />
              <FiTrash
                onClick={() => setShowEditTag({ edit: '', del: showTag })}
                className='text-slate-500 text-xl cursor-pointer'
              />
            </div>
          </section>
        </header>
      )}
    </>
  );
};

export default Header;
