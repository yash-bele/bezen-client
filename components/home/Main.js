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
            className='border border-slate-300 rounded-lg py-1 px-2 h-44 relative'
          >
            <h1 className='text-sm font-semibold mb-1.5'>{title}</h1>
            <p className='text-xs'>
              {note.length > 150 ? `${note.substring(0, 165)}...` : note}
            </p>
            {pin && <AiFillPushpin className='absolute top-1 right-1' />}
          </section>
        );
      })}
    </main>
  );
};

export default Main;
