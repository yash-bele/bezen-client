import { AiFillPushpin } from 'react-icons/ai';

const Main = ({ cards, showTag, setShowEdit }) => {
  const pinx = [];
  const unpinx = [];
  cards.forEach((i) => (i.pin ? pinx.push(i) : unpinx.push(i)));
  let sort = [...pinx, ...unpinx];
  if (showTag) {
    sort = sort.filter((i) => i.cardTags.includes(showTag));
  }

  return (
    <main className='grid grid-cols-2 gap-2 mt-7 max-h-[85%] overflow-y-scroll scrollbar-thin hover:scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full cursor-default'>
      {sort.map((i) => {
        const { id, title, note, pin, cardTags } = i;
        return (
          <section
            onClick={() => setShowEdit(i)}
            key={id}
            className='border border-slate-300 shadow rounded-lg py-1 px-2 h-[170px] relative'
          >
            <h1 className='text-sm font-semibold mb-2'>
              {title.length > 15 ? `${title.substring(0, 15)}...` : title}
            </h1>
            <p className='text-xs break-all'>
              {note.length > 190 ? `${note.substring(0, 190)}...` : note}
            </p>
            {pin && <AiFillPushpin className='absolute top-1 right-1' />}
          </section>
        );
      })}
    </main>
  );
};

export default Main;
