import Header from './Header';
import Main from './Main';

const Home = ({
  setShowMenu,
  showTag,
  setShowAdd,
  cards,
  setShowEdit,
  setShowEditTag,
}) => {
  return (
    <>
      <Header
        setShowMenu={setShowMenu}
        showTag={showTag}
        setShowAdd={setShowAdd}
        setShowEditTag={setShowEditTag}
      />
      <Main cards={cards} showTag={showTag} setShowEdit={setShowEdit} />
    </>
  );
};

export default Home;
