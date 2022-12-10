import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';
import { MdOutlineNewLabel, MdAddTask, MdOutlineClose } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { BsArrowLeftCircle } from 'react-icons/bs';

const Add = ({
  showAdd,
  setShowAdd,
  showEdit,
  setShowEdit,
  setShowDelCard,
  data,
  setData,
  cards,
  setCards,
  tags,
}) => {
  const [addCardTag, setAddCardTag] = useState(false);
  const [text, setText] = useState();
  const [pin, setPin] = useState();
  const [cardTags, setCardTags] = useState();
  useEffect(() => {
    setText(
      showEdit.id
        ? { title: showEdit.title, note: showEdit.note }
        : { title: '', note: '' }
    );
    setPin(showEdit.id ? showEdit.pin : false);
    setCardTags(showEdit.id ? showEdit.cardTags : []);
  }, [showEdit.id]);

  const handleChangeText = (params) => (e) => {
    setText({ ...text, [params]: e.target.value });
  };

  const handleChangeTags = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setCardTags([...cardTags, value]);
    } else {
      setCardTags(cardTags.filter((i) => i !== value));
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    if (!text.title) return toast.error('Empty title', { pauseOnHover: false });
    if (!text.note) return toast.error('Empty note', { pauseOnHover: false });
    setText({ title: '', note: '' });
    setPin(false);
    setCardTags([]);
    setShowAdd(false);
    const id = nanoid();
    const card = { id, ...text, pin, cardTags };
    const cardsx = [card, ...cards];
    setCards(cardsx);
    const datax = { ...data, cards: cardsx };
    setData(datax);
    await axios.patch(`https://bezen-server.vercel.app/1`, datax);
  };

  const patchData = async (e) => {
    e.preventDefault();
    if (!text.title) return toast.error('Empty title', { pauseOnHover: false });
    if (!text.note) return toast.error('Empty note', { pauseOnHover: false });
    setShowEdit({});
    const card = cards.find((i) => i.id === showEdit.id);
    const cardsx = [
      { ...card, ...text, pin, cardTags },
      ...cards.filter((i) => i.id !== showEdit.id),
    ];
    setCards(cardsx);
    const datax = { ...data, cards: cardsx };
    setData(datax);
    await axios.patch(`https://bezen-server.vercel.app/1`, datax);
  };

  return (
    <>
      {(showAdd || showEdit.id) && (
        <main className='h-full w-80 flex justify-center absolute top-0'>
          <section
            className={`bg-white rounded-lg w-full h-[168px] mt-52 shadow-lg relative ${
              !addCardTag ? 'block' : 'hidden'
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                showAdd ? 'p-3 pt-2.5' : 'p-3 pt-1.5'
              }`}
            >
              <input
                value={text.title}
                onChange={handleChangeText('title')}
                type='text'
                placeholder='Title'
                spellCheck='false'
                className='outline-none bg-transparent w-full'
              />
              <div className='relative mr-4'>
                {pin ? (
                  <AiFillPushpin className='text-2xl' />
                ) : (
                  <AiOutlinePushpin className='text-2xl' />
                )}
                <input
                  value={pin}
                  onChange={(e) => setPin(e.target.checked)}
                  defaultChecked={showEdit.pin}
                  type='checkbox'
                  className='absolute top-0.5 left-0.5 w-5 h-5 cursor-pointer opacity-0'
                />
              </div>
              {!showAdd && (
                <FiTrash
                  onClick={() => setShowDelCard(showEdit.id)}
                  className='text-[27px] cursor-pointer mr-4'
                />
              )}
              <MdOutlineClose
                onClick={() => {
                  setText({ title: '', note: '' });
                  setPin(false);
                  setCardTags([]);
                  setShowAdd(false);
                  setShowEdit({});
                }}
                className={`cursor-pointer ${
                  showEdit.id ? 'text-4xl' : 'text-3xl'
                }`}
              />
            </div>
            <div className='px-3'>
              <textarea
                value={text.note}
                onChange={handleChangeText('note')}
                type='text'
                placeholder='Note'
                rows={3}
                spellCheck='false'
                className='outline-none bg-transparent w-full text-sm resize-none scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full'
              />
            </div>
            <div className='flex items-center p-3 overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full -z-10'>
              {cardTags.map((i) => {
                return (
                  <div
                    key={i}
                    className='py-0.5 px-2 rounded-lg bg-slate-300 cursor-pointer mr-2'
                  >
                    <p className='text-xs'>{i}</p>
                  </div>
                );
              })}
              <MdOutlineNewLabel
                className='text-2xl ml-1 cursor-pointer'
                onClick={() => setAddCardTag(true)}
              />
            </div>
            <MdAddTask
              onClick={showAdd ? postData : patchData}
              className={`absolute ${
                showEdit.id ? 'bottom-3' : 'bottom-3.5'
              } right-3 text-2xl cursor-pointer`}
            />
          </section>
          <section
            className={`bg-white rounded-lg w-full h-[168px] mt-52 relative overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full shadow-lg ${
              addCardTag ? 'block' : 'hidden'
            }`}
          >
            <BsArrowLeftCircle
              className='sticky top-3 left-3 text-2xl cursor-pointer'
              onClick={() => setAddCardTag(false)}
            />
            <ul className='text-sm text-gray-900 -mt-6'>
              {tags.map((i) => {
                return (
                  <li
                    key={i}
                    className='w-40 bg-slate-300 rounded-lg mt-2 mx-auto'
                  >
                    <div className='flex items-center pl-3'>
                      <input
                        value={i}
                        onChange={handleChangeTags}
                        id={i}
                        defaultChecked={
                          !showAdd && showEdit.cardTags.some((j) => j === i)
                        }
                        type='checkbox'
                        className='w-4 h-4 text-slate-500 rounded'
                      />
                      <label
                        htmlFor={i}
                        className='py-3 ml-2 w-full text-sm font-medium text-gray-700'
                      >
                        {i}
                      </label>
                    </div>
                  </li>
                );
              })}
              <div className='w-px h-2'></div>
            </ul>
          </section>
        </main>
      )}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  );
};

export default Add;
