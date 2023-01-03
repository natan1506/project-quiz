import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function CreateQuiz () {
  let navigate = useNavigate();
  const [answersCreated, setAnswersCreated] = useState([])
  const [questionsCreated, setQuestionsCreated] = useState([])
  const [errors, setErrors] = useState('')

  const handleAddAnswer = () => {
    const input = document.getElementById("answerInput")
    if(input.value != ""){
      const answers = [...answersCreated];
      answers.push(input.value)
      setAnswersCreated(answers)
      input.value = ""
    }
  }

  const handleAddQuestion = () => {
    const nameQuestion = document.getElementById("questionQuiz")
    const answersOptions = [...answersCreated];
    const answerSelected = document.getElementsByName("answers")
    let correctAnswer;
    answerSelected.forEach(item => {
      if(item.checked === true) {
        correctAnswer = item.value;
      }
    })
    if(nameQuestion.value != "" && answersOptions.length > 0 && correctAnswer){
      const dataObject = {
        name: nameQuestion.value,
        answers: answersOptions,
        correct: correctAnswer
      }

      const questions = [...questionsCreated];
      questions.push(dataObject)
      setQuestionsCreated(questions)
      nameQuestion.value = ""
      document.getElementById("answerInput").value = ""
      setAnswersCreated([])
      setErrors("")
    } else {
      setErrors("preencha todos os campos!")
    }
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const nameQuiz = document.getElementById("nameQuiz").value
    axios.post('http://localhost:3000/quiz', {
      "name" : nameQuiz,
      "questions" : questionsCreated,
    })
      .then(res => {
        navigate("/")
      })

  }

  return (
    <div className="flex p-2 justify-center flex-1 h-screen bg-gray-800 text-gray-300">
      <div className="flex flex-1 flex-col p-4">
        <form>
          <div className="flex flex-col gap-2 py-3">
            <label htmlFor="">Nome do questionario</label>
            <input type="text" className="bg-gray-600 rounded p-2" name="nameQuiz" id="nameQuiz" />
          </div>
          <div className="px-2 border rounded border-gray-600">
            <div className="pt-4 border-b pb-2">
              <h2 className="text-xl">Perguntas</h2>
            </div>
            <div className="flex flex-col gap-2 py-3"> 
              <div className="flex items-center gap-2">
                <label htmlFor="">pergunta</label>
                <button type="button" className="border border-gray-300 rounded px-2" onClick={handleAddQuestion}>+</button>
              </div>
              <input type="text" className="bg-gray-600 rounded p-2" id="questionQuiz" name="questionQuiz"/>
            </div>
            <div className="flex flex-col gap-2 py-3">
              <div className="flex items-center gap-2">
                <label htmlFor="">Adicione uma resposta</label>
                <button type="button" className="border border-gray-300 rounded px-2"onClick={handleAddAnswer}>+</button>
              </div>
              <input type="text" id="answerInput" className="bg-gray-600 rounded p-2"/>
            </div>
            <div className="py-2">
              <div className="pt-4 border-b pb-2 mb-3">
                <h2 className="text-xl">Selecione a resposta correta</h2>
              </div>
              {answersCreated.map(item =>(
                <div className="flex gap-2 items-center">
                  <input type="radio" name="answers" id={item} value={item}/>
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </form>
        {questionsCreated.length > 0 && (
          <div className="p-2 rounded">
            <table className="w-full border">
              <thead className="bg-blue-400 text-gray-800 rounded">
                <tr>
                  <td >pergunta</td>
                  <td>resposta correta</td>
                </tr>
              </thead>
              <tbody>
                {questionsCreated.map(question => (
                  <tr>
                    <td>{question.name}</td>
                    <td>{question.correct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="p-2">
          {errors && (
            <span className="text-red-500">{errors}</span>
          )}
        </div>
        <div className="flex items-center justify-center p-2">
          <button onClick={handleSubmitForm} className="border rounded border-blue-600 px-3 py-2 hover:bg-blue-800 transition-colors">
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}