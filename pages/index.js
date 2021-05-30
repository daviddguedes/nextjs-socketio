import Head from 'next/head';
import axios from 'axios';
import SocketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';
import NavTop from '../components/NavTop';
import styles from '../styles/Home.module.css';
import ModalComponent from '../components/ModalComponent';

const colors = [
  '#F08080', '#A52A2A', '#5F9EA0', '#D2691E', '#BDB76B', '#556B2F', '#483D8B',
  '#4B0082', '#BC8F8F', '#FA8072', '#008080', '#2E8B57', '#9370DB', '#778899'
];

export async function getServerSideProps(context) {
  return {
    props: {
      messages: []
    }
  }
}

export default function Home(props) {
  const [connected, setConnected] = useState(false);
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
    const socket = SocketIOClient.connect({
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    socket.on("message", (message) => {
      messages.push({ id: Math.random(), message });
      setMessages([...messages]);
      handleClose();
    });

    if (socket) return () => socket.disconnect();
  }, []);

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
    try {
      await axios.post("/api/message", { message });
    } catch (error) {
      console.log('ERROR', error);
    }
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
