import { useEffect, useMemo, useState } from 'react';
import Words from '@/mock/_words.json';

type Option = {
  text: string;
  isCorrect: boolean;
};

export default function Home() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [selectItem, setSelectItem] = useState({} as Option);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  const shuffle: (array: Option[]) => Option[] = array => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  };

  const wordData = useMemo(() => {
    console.log('Words[questionIndex]', Words[questionIndex]);
    const question = Words[questionIndex].eng;
    const successOption = {
      text: Words[questionIndex].tr,
      isCorrect: true
    };
    const options = [successOption];

    while (options.length < 4) {
      const randomIndex = getRandomInt(0, Words.length);
      if (randomIndex !== questionIndex) {
        options.push({
          text: Words[randomIndex].tr,
          isCorrect: false
        });
      }
    }
    return {
      question,
      options: shuffle(options)
    };
  }, [questionIndex]);

  const nextQuestion = () => {
    setQuestionIndex(Math.floor(Math.random() * Words.length));
  };

  const checkAnswer = () => {
    if (selectItem.isCorrect) {
      nextQuestion();
    }

    setSelectItem({} as Option);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '140px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        height: '100%'
      }}
    >
      <h1
        style={{
          color: '#333',
          fontSize: '35px',
          marginBottom: '20px'
        }}
      >
        🧩Word Game🧩
      </h1>

      <p
        style={{
          marginBottom: '10px',
          fontSize: '25px',
          color: 'black'
        }}
      >
        {wordData.question}
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          grid: 'auto / 180px 180px 180px 180px'
        }}
      >
        {wordData.options.map((option, index) => (
          <button
            onClick={() => setSelectItem(option)}
            key={index}
            id='options'
            style={{
              width: '180px',
              height: '150px',
              margin: '5px',
              borderRadius: '10px',
              border: '5px solid grey',
              boxSizing: 'border-box',
              padding: '20px 30px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#ddd',
              color: 'black',
              transition: 'background-color 0.3s ease',
              ...(option.text === selectItem.text
                ? {
                    backgroundColor: '#FFD700',
                    color: 'black',
                    fontWeight: 'bold'
                  }
                : {})
            }}
          >
            <p>{option.text}</p>
          </button>
        ))}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px'
        }}
      >
        <button
          onClick={checkAnswer}
          style={{
            marginTop: '10px',
            backgroundColor: '#FFC300',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
        >
          Cevabı Kontrol Et
        </button>
        <button
          style={{
            marginTop: '10px',
            backgroundColor: '#FFC300',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
          onClick={nextQuestion}
        >
          Sonraki Soru
        </button>
      </div>
      <div id='result'></div>
      <button
        style={{
          marginTop: '10px',
          backgroundColor: '#FFC300',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease'
        }}
      >
        <a
          style={{
            // text-decoration: none;
            // color: black;
            textDecoration: 'none',
            color: 'black'
          }}
          href='/games/wordCombination/index.html'
        >
          Word Combination Game
        </a>
      </button>
    </div>
  );
}
