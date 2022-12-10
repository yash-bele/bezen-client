import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FaRegEdit } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';

const EditTag = ({
  setShowMenu,
  setShowEdit,
  setShowTag,
  showEditTag,
  setShowEditTag,
  showDelCard,
  setShowDelCard,
  data,
  setData,
  cards,
  setCards,
  tags,
  setTags,
}) => {
  const ref = useRef(null);
  const [edit, setEdit] = useState('');
  useEffect(() => {
    setEdit(showEditTag.edit);
    showEditTag.edit && ref.current.focus();
  }, [showEditTag.edit]);

  const delTag = async () => {
    setShowEditTag({ edit: '', del: '' });
    setShowMenu(true);
    const tagsx = tags.filter((i) => i !== showEditTag.del);
    setTags(tagsx);
    const cardsx = cards.map((i) => {
      const cardTagsx = i.cardTags.filter((j) => j !== showEditTag.del);
      return { ...i, cardTags: cardTagsx };
    });
    setCards(cardsx);
    const datax = { ...data, tags: tagsx, cards: cardsx };
    setData(datax);
    await axios.patch(`https://bezen-server.vercel.app/1`, datax);
  };

  const delCard = async () => {
    setShowDelCard(null);
    setShowEdit({});
    const cardsx = cards.filter((i) => i.id !== showDelCard);
    setCards(cardsx);
    const datax = { ...data, cards: cardsx };
    setData(datax);
    await axios.patch(`https://bezen-server.vercel.app/1`, datax);
  };

  const patchData = async (e) => {
    e.preventDefault();
    const trimEdit = edit
      .split(' ')
      .filter((i) => i !== '')
      .join(' ');
    if (!trimEdit) return toast.error('Enter tag');
    setShowEditTag({ edit: '', del: '' });
    setShowTag(trimEdit);
    const tagsx = tags.map((i) => (i === showEditTag.edit ? trimEdit : i));
    setTags(tagsx);
    const cardsx = cards.map((i) => {
      const cardTagsx = i.cardTags.map((j) =>
        j === showEditTag.edit ? trimEdit : j
      );
      return { ...i, cardTags: cardTagsx };
    });
    setCards(cardsx);
    const datax = { ...data, tags: tagsx, cards: cardsx };
    setData(datax);
    await axios.patch(`https://bezen-server.vercel.app/1`, datax);
  };

  return (
    <>
      {showEditTag.del && (
        <main className='h-full w-80 flex justify-center items-center absolute top-0'>
          <section className='bg-white rounded-lg w-full h-[168px] -mt-20 shadow-lg px-3 py-1 flex flex-col justify-around'>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold'>Delete Tag</h1>
              <MdOutlineClose
                onClick={() => setShowEditTag({ edit: '', del: '' })}
                className='text-2xl cursor-pointer'
              />
            </div>
            <div>
              <p className='text-sm'>
                We'll delete this tag and remove it from all of your notes. Your
                notes wont be deleted.
              </p>
            </div>
            <div className='flex justify-end'>
              <FiTrash
                type='submit'
                onClick={delTag}
                className='text-xl cursor-pointer'
              />
            </div>
          </section>
        </main>
      )}
      {showDelCard && (
        <main className='h-full w-80 flex justify-center items-center absolute top-0'>
          <section className='bg-white rounded-lg w-full h-[168px] -mt-20 shadow-lg px-3 flex flex-col justify-around'>
            <div className='flex items-center justify-between -mt-0.5'>
              <h1 className='font-semibold'>Delete Note</h1>
              <MdOutlineClose
                onClick={() => setShowDelCard(null)}
                className='text-2xl cursor-pointer'
              />
            </div>
            <div>
              <p className='text-sm'>
                Are you sure you want to permanently delete this note?
              </p>
            </div>
            <div className='flex justify-end'>
              <FiTrash
                type='submit'
                onClick={delCard}
                className='text-xl cursor-pointer'
              />
            </div>
          </section>
        </main>
      )}
      {showEditTag.edit && (
        <main className='h-full w-80 flex justify-center items-center absolute top-0'>
          <section className='bg-white rounded-lg w-full h-[168px] -mt-20 shadow-lg px-3 flex flex-col justify-around'>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold'>Rename Tag</h1>
              <MdOutlineClose
                onClick={() => setShowEditTag({ edit: '', del: '' })}
                className='text-2xl cursor-pointer'
              />
            </div>
            <div className='border-b border-slate-500'>
              <input
                ref={ref}
                value={edit}
                onChange={(e) => setEdit(e.target.value)}
                type='text'
                spellCheck='false'
                className='outline-none w-full text-sm'
              />
            </div>
            <div className='flex justify-end'>
              <FaRegEdit
                onClick={patchData}
                className='text-xl cursor-pointer'
              />
            </div>
          </section>
        </main>
      )}
      <ToastContainer position='top-center' theme='colored' />
    </>
  );
};

export default EditTag;
