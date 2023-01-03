
export default function f(url, user , postData) {

  const pr = fetch(url,{
      method: typeof(postData) !== 'undefined' ? 'POST' : 'GET',
      headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
      },
      body: postData ? postData : null
  });

  return pr.then(res => res.json());
}