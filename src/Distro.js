import { useContext, useEffect, createContext, useState } from "react";
import axios from "axios";
import Modal from 'react-modal';

const themes = {
  light: {
    text: "Light Theme",
    background: "rgb(180, 187, 199)",

  },
  dark: {
    text: "Dark Mode",
    background: "rgb(40, 44, 52)",
  },
};

const ThemeContext = createContext();

export default function Distro() {
  const [show, setShow] = useState(false);
  const [valueTheme, setValueTheme] = useState(themes.dark);

  function num1() {
    setValueTheme(valueTheme === themes.light ? themes.dark : themes.light)
  }
  function num2() {
    setShow(!show)
  }

  return (
    <ThemeContext.Provider value={valueTheme}>
      <div
        className="contentWrapper"
        style={{ backgroundColor: valueTheme.background, padding: 40 }}
      >
        <h1 className="kelompok">ASTORE DISTRO </h1>
        {show && (
          <Content tema={valueTheme} />
        )}

        <button
          className="Button"
          onClick={() => { num1(); num2() }}>{show ? "hide" : "show"}
        </button>
      </div>
    </ThemeContext.Provider>
  );
}

function Content() {
  const [data, SetData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Detail, setDetail] = useState({});
  function OpenModal(id, name, des, harga, image) {
    setDetail({
      id: id,
      name: name,
      des: des,
      harga: harga,
      image: image
    });

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3001/Kaos`,
    })
      .then((data) => {
        console.log(data.data);
        SetData([...data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="center">
        {data.map((p) => (
          <div item key={p.id}>
            <div className="property-card" onClick={() => {
              OpenModal(
                p.id,
                p.name,
                p.des,
                p.harga,
                p.image,
              )
            }}>
              <div className="property-image" style={{ backgroundImage: `url(${p.image})` }}>
                <div className="property-image-title" >
                </div>
              </div>
              <div className="property-description">
                <h5 style={{ color: "#a265e7" }}> {p.name} </h5>
                <p>{p.harga}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className="modal">
          <h1>{Detail.name}</h1>
          <img src={Detail.image} alt="" />
          <h3>{Detail.harga}</h3>
          <p>{Detail.des}</p>
          <button className="Button">Beli</button>
        </div>
      </Modal>
      <Text />
    </div>
  );
}

function Text() {
  const theme = useContext(ThemeContext);
  return (
    <p
      className="titleContext"
      style={{ color: theme.text }}
    >
      {theme.text} diterapkan
    </p>
  );
}