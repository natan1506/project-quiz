import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function QuizList(){
  const [quizFromApi, setQuizFromApi] = useState();

  useEffect(()=> {
    const loadData = async () => {
      await axios.get(`http://localhost:3000/quiz`)
      .then(res => {
        console.log(res.data)
        setQuizFromApi(res.data)
      })
    }
    loadData()
  }, [])

  return(
    <div className="flex flex-col items-center justify-center p-2">
      <Link to="/create-quiz" className="border rounded p-2">
        Create Quiz
      </Link>
      <div className="flex gap-2 py-2">
        {quizFromApi && quizFromApi.map(item => (
          <Link key={item.id} to={`quiz/${item.id}`} className="border rounded p-2">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}