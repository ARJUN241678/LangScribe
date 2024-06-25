import { useState } from 'react'
import './App.css'
import HomePage from './componenets/HomePage'
import Header from './componenets/Header'
import FileDisplay from './componenets/FileDisplay'

function App() {
 
const [file, setFile] = useState(null);
const [audioStream, setAudioStream] = useState(null);

const isAudioAvailable=file || audioStream
function handleAudioReset() {
  setFile(null)
  setAudioStream(null)
}

  return (
    <div className='flex flex-col p-4'>
      <section className='min-h-screen flex flex-col'>
<Header/>

{isAudioAvailable ? (<FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={audioStream}/>) :(<HomePage setFile={setFile} setAudioStream={setAudioStream}/>)}

      </section>
     
    </div>
  )
}

export default App
