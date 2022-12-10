import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Menu from '../components/Menu';
import Home from '../components/home/Home';
import Add from '../components/Add';
import EditTag from '../components/EditTag';
import Loading from '../components/Loading';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showTag, setShowTag] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEditTag, setShowEditTag] = useState({ edit: '', del: '' });
  const [showEdit, setShowEdit] = useState({});
  const [showDelCard, setShowDelCard] = useState(null);
  const [data, setData] = useState({});
  const [cards, setCards] = useState([]);
  const [tags, setTags] = useState([]);

  const getData = async () => {
    await axios.get(`https://bezen-server.vercel.app/1`).then((data) => {
      setLoading(true);
      setData(data.data);
      setCards(data.data.cards);
      setTags(data.data.tags);
      setLoading(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Head>
        <title>BeZen</title>
        <meta name='description' content='Website' />
        <link rel='icon' href='' />
      </Head>
      <main
        className={`absolute w-full h-full flex justify-center ${
          (showAdd || showEdit.id || showEditTag.edit || showEditTag.del) &&
          'bg-black/30'
        }`}
      >
        <section className='w-80 h-full'>
          {!showMenu && (
            <Home
              setShowMenu={setShowMenu}
              showTag={showTag}
              setShowAdd={setShowAdd}
              setShowEditTag={setShowEditTag}
              setShowEdit={setShowEdit}
              cards={cards}
            />
          )}
          {showMenu && (
            <Menu
              setShowMenu={setShowMenu}
              setShowTag={setShowTag}
              data={data}
              setData={setData}
              tags={tags}
              setTags={setTags}
            />
          )}
          <Add
            showAdd={showAdd}
            setShowAdd={setShowAdd}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            setShowDelCard={setShowDelCard}
            data={data}
            setData={setData}
            cards={cards}
            setCards={setCards}
            tags={tags}
          />
          <EditTag
            setShowMenu={setShowMenu}
            setShowEdit={setShowEdit}
            setShowTag={setShowTag}
            showEditTag={showEditTag}
            setShowEditTag={setShowEditTag}
            showDelCard={showDelCard}
            setShowDelCard={setShowDelCard}
            data={data}
            setData={setData}
            cards={cards}
            setCards={setCards}
            tags={tags}
            setTags={setTags}
          />
        </section>
      </main>
    </>
  );
};

export default App;
