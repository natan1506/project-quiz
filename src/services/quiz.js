import axios from 'axios'

export const getQuestions = async () => {
  const response = await axios.get(`http://localhost:3000/questions`)
    .then((data) => {return data})

  return response;
};
