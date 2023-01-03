export function Question({data, calculatedAnswer}) {
  const handleChangeAnswer = (idQuest) => {
    calculatedAnswer(idQuest, event.target.value)
  }

  if(data.length === 0) {
    return (
      <div className="flex-1 bg-red-500"></div>
    )
  }

  return (
    <div className="flex flex-col border-2 rounded border-gray-500 bg-gray-700 text-gray-300 m-3">
      {data.questions.map(quest => (
        <div className="flex flex-col py-2 px-6 my-2" key={quest.id}>
          <div>
            <h2>{quest.question}</h2>
          </div>
          <div>
            <div className="flex items-center gap-2">
              {quest.answers.map(answer => (
                <div key={`${quest.id}-${answer}`} className="flex items-center gap-2">
                  <input type="radio" value={answer} name={quest.id} onChange={() =>{handleChangeAnswer(quest.id)}}/>
                  <label>{answer}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
    </div>
  )
}