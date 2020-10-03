import { useState, useEffect } from 'react';
import firebase from '../Firebase';

export default function CommentAdd({ movieId }) {
  const [ currentUserName, setCurrentUserName ] = useState();
  const [ comment, setComment ] = useState(''); // комменты для отправки на firebase
  const [ serverComments, setServerComments ] = useState([]); // комменты из firebase

  useEffect(() => {
    const db = firebase.database();
    const ref = db.ref();

    let currentUserId;

    // получаю текущего пользователя
    // через промис потому что onAuthStateChanged получает пользователя не сразу и надо дождаться получения чтобы пользоваться этим значением
    function getUser() {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(authUser => {
          if (authUser) {
            currentUserId = authUser.uid; // for inside usage
            resolve();
          }
        })
      })
    }
  
    // получаю username текущего пользователя и комментарии к фильму
    async function getData() {
      await getUser();
      ref.on('value', snap => {
        let username = snap.val().users[currentUserId].username;
        setCurrentUserName(username) // for return
        let comments;
        if (snap.val().comments && snap.val().comments[movieId]) {
          comments = snap.val().comments[movieId]
          setServerComments(comments)
        }
      })
    }

    getData();
  }, []);

  function submit(e) {
    e.preventDefault();

    // дата публикации
    let date = new Date();
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        year = date.getFullYear();

    const db = firebase.database();
    const ref = db.ref()

    let oldValues = []; // существующие значения

    // проверка есть ли уже comments если нет то пропускаю действие
    ref.on('value', snap => {
      if (snap.val().comments && snap.val().comments[movieId]) {
        oldValues = snap.val().comments[movieId]
      };
    })

    // добавление комментария
    db.ref(`/comments/${movieId}`).set([
      ...oldValues, 
      {
        body: comment,
        commentator_username: currentUserName,
        date: `Дата публикации: ${hours}:${minutes} ${year}`
      }
    ])

    setComment('');
  }

  return (
    <>
      <form onSubmit={submit}>
        <h6>{currentUserName}</h6>
        <textarea 
          value={comment}
          onChange={e => setComment(e.target.value)} ></textarea>
        <button type='submit'>Add Comment </button>
      </form>
      <hr/>
      <h2>Комментарии</h2>
      <ul style={{ width: 'fit-content'}}>
        {serverComments ? (
          serverComments.map((comment, index) => (
            <li key={index}>
              <div className='d-flex justify-content-between w-100'>
                <h6>{comment.commentator_username}</h6>
                <span>{comment.date}</span>
              </div>
              <p>{comment.body}</p>
            </li>
          ))
        ) : null}
      </ul> 
    </>
  )
}