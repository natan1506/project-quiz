import { useEffect, useState } from 'react'
import axios from 'axios'
import { Question } from '../components/Question'
import { useParams } from 'react-router-dom'

export function Quiz() {
  const {id} = useParams();
  const [answersSelected, setAnswersSelected] = useState([])
  const [questionFromApi, setQuestionFromApi] = useState([])
  const [isError, setIsError] = useState()
  const [resultQuiz, setResultQuiz] = useState()
  

  const styleError = isError ? 'text-red-500': ''

  useEffect(()=> {
    const loadData = async () => {
      await axios.get(`http://localhost:3000/quiz/${id}`)
      .then(res => {
        setQuestionFromApi(res.data)
        console.log(res.data)
      })
    }
    loadData()
  }, [])

  const handleCalculatedAnswer = (idQuest, valueSelected) => {
  console.log(idQuest, valueSelected)
    const found = answersSelected.findIndex(element => element.id === idQuest);
    
    if(found >= 0){
      const newArray = [...answersSelected];
      newArray[found].selected = valueSelected;

      setAnswersSelected(newArray);
    }else {
      setAnswersSelected([...answersSelected, {id: idQuest, selected: valueSelected}]);
    }
  }

  const handleCheckQuiz = (e) => {
    e.preventDefault();
    console.log(answersSelected)
    if(answersSelected.length < questionFromApi.questions.length){
      setIsError('selecione todas as perguntas')
    }else {
      setIsError()
      let correctAnswer = 0;
      let totalAnswers = questionFromApi.questions.length;

      answersSelected.map(answer => {
        const found = questionFromApi.questions.find(element => element.id === answer.id);
        console.log(found)
        if(found.correct === answer.selected){
          correctAnswer++
        }
      })
      setResultQuiz(`Você acertou ${correctAnswer} de ${totalAnswers}`)
    }
  }

  if(resultQuiz){
    return (
      <div className='flex flex-1 bg-red-500'>
        <span>
          {resultQuiz}
        </span>
      </div>
    )
  }

  if(questionFromApi.length === 0){
    return (
      <div className='flex flex-1 bg-red-500'>
        <span>
          carregando
        </span>
      </div>
    )
  }



  return (
    <div className="bg-gray-800 h-screen">
      <form 
        onSubmit={handleCheckQuiz} 
        className='flex flex-col items-center'
      >
        <Question calculatedAnswer={handleCalculatedAnswer} data={questionFromApi} />
        <button type='submit'
          className='bg-blue-800 p-2 rounded border border-blue-500 text-gray-100 hover:bg-blue-600 transition-colors'
        >
          Finish Quiz
        </button>
      </form>
      {isError && (
        <span>{isError}</span>
      )}
      {answersSelected.length > 0 && answersSelected.map(item => (
        <div>
          <span>{item.id}</span>
          <span>{item.selected}</span>
        </div>
      ))}
   </div>
  )
}

