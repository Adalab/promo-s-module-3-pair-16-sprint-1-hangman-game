import { useEffect, useState } from 'react';
import '../styles/App.scss';
import callToApi from '../services/api';

function App() {
  let [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  let filtersLetter  = [];


  useEffect(() => {
    callToApi().then((response) => {
      setWord(response)
    })
  }, [])

  const handleClick = () => {
    setNumberOfErrors(numberOfErrors+1)
    console.log(numberOfErrors)
  }

  const handleLetter = (event) => {
    const letterValue = event.target.value;
    const includesLetter = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g ;
    console.log(letterValue.search(includesLetter));
    if(letterValue.search(includesLetter)!== -1) {
      setLastLetter(letterValue);
      setUserLetters([...userLetters,letterValue]);
    }
  }

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    /*
    return wordLetters.map((wordLetter, index) => {
      if(userLetters.includes(wordLetter)) {
        return <li key={index} className="letter">{lastLetter}</li>
      } else {
        return <li key={index} className="letter"></li>
      }
      
    })
    */
    return wordLetters.map((wordLetter, index) => 
     <li key={index} className="letter">{ userLetters.includes(wordLetter) && wordLetter}</li>  
    )
  }

  const renderErrorLetters = () => {
    filtersLetter = userLetters.filter((letter) => (
     !word.includes(letter)
    ))
    return filtersLetter.map ( (filterLetter, index) => {
      return <li key={index} className="letter">{filterLetter}</li>
    })
  }

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              {renderErrorLetters()}
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">Escribe una letra:</label>
            <input
              autocomplete="off"
              className="form__input"
              maxlength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              onChange = {handleLetter}
              value = {lastLetter}
            />
          </form>
        </section>
        <section className={"dummy error-"+ filtersLetter.length}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
          <button onClick={handleClick}>Incrementar</button>
        </section>
      </main>
    </div>
  );
}

export default App;
