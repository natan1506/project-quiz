import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Quiz } from './pages/Quiz'
import { QuizList } from './pages/QuizList'
import { CreateQuiz } from './pages/CreateQuiz'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <React.Fragment>
            <Route path="/" element={<QuizList />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/quiz/:id" element={<Quiz />} />
        </React.Fragment>
      </Routes>
    </BrowserRouter>
  )
}

export default App
