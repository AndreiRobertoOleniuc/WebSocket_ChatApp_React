import React, { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h1>Working</h1>
    </div>
  )
}

export default App
