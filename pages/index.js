import Head from 'next/head';
import firebase from "firebase/app";
import "firebase/database";
import { useEffect, useState } from 'react';
import NavTop from '../components/NavTop';
import styles from '../styles/Home.module.css';
import ModalComponent from '../components/ModalComponent';


export async function getStaticProps() {
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: `app-askut.firebaseapp.com`,
    databaseURL: "https://app-askut-default-rtdb.firebaseio.com",
    projectId: "app-askut",
    storageBucket: `app-askut.appspot.com`,
    messagingSenderId: "514838385270",
    appId: "1:514838385270:web:1bcc09c09107de77d50557",
    measurementId: "G-W5E14NHNN6"
  };

  return {
    props: {
      firebaseConfig
    }
  }
}

const colors = [
  '#F08080', '#A52A2A', '#5F9EA0', '#D2691E', '#BDB76B', '#556B2F', '#483D8B',
  '#4B0082', '#BC8F8F', '#FA8072', '#008080', '#2E8B57', '#9370DB', '#778899'
];

export default function Home(props) {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalState, setModalState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    enforceFocus: true,
    isOpen: false,
    usePortal: true,
  });

  useEffect(() => {
    firebase.initializeApp(props.firebaseConfig);

    const db = firebase.database().ref("notes").orderByChild('datetime');
    db.on('value', (snapshot) => {
      const data = snapshot.val();
      const notes = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          const element = { id: key, datetime: data[key].datetime, message: data[key].text };
          notes.push(element);
          setMessages([...notes]);
        });
      }
    });
  }, [props.firebaseConfig]);

  const handleOpen = () => {
    setModalState(state => ({ ...state, isOpen: true }));
  }

  const handleClose = () => {
    setModalState(state => ({ ...state, isOpen: false }));
    setValue('');
  }

  const handleChange = (e) => {
    const { target: { value: targetValue } } = e;
    setValue(targetValue);
  }

  const handleAddMessage = async (message) => {
    firebase.database().ref('notes/' + new Date().getTime()).set({
      datetime: new Date().toLocaleString(),
      text: message,
    }).finally(() => handleClose());
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Deixe seu recado</title>
        <meta name="description" content="Deixe aqui seu recado. Sent your note." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavTop onAddClick={handleOpen} />

      <div className={styles.grid_message}>
        {messages.map(val => (
          <div
            className={styles.item_message}
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)]
            }} key={val.id}>
            <p>{val.message}</p>
            <span className={styles.span_datetime}>{val.datetime}</span>
          </div>
        ))}
      </div>

      <ModalComponent
        handleClose={handleClose}
        modalState={modalState}
        handleChange={handleChange}
        value={value}
        handleButtonAction={handleAddMessage} />

    </div>
  )
}
