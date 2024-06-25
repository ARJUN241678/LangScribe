import React, { useState, useEffect } from 'react';

const recognition = (
  'webkitSpeechRecognition' in window
    ? new window.webkitSpeechRecognition()
    : 'SpeechRecognition' in window
    ? new window.SpeechRecognition()
    : null
);

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
}

export default function HomePage(props) {
  const { setFile } = props;
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (recognition) {
      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript + ' ';
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
      }
    };
  }, []);

  const startRecording = () => {
    if (recognition && !isRecording) {
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setTranscript(''); // Reset transcript when recording stops
    }
  };

  const handleFileChange = (e) => {
    const tempFile = e.target.files[0];
    if (tempFile) {
      setFile(tempFile);
    }
  };

  return (
    <main className='flex-1 p-4 bg-white-400 flex flex-col justify-center items-center space-y-4'>
      <h1 className='text-6xl font-bold'>
        Lang<span className='text-blue-400'>Scribe</span>
      </h1>
      <p className='text-xl font-bold'>
        Record <span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate
      </p>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`flex items-center justify-between rounded-full px-4 py-2 w-40 mx-auto transition duration-300 ease-in-out transform ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
      >
        <p className="mr-1 text-white text-sm font-bold">
          {isRecording ? 'Stop' : 'Record'}
        </p>
        <i className={`fa-solid ${isRecording ? 'fa-stop' : 'fa-microphone'} text-white`}></i>
      </button>

      <label className='cursor-pointer text-blue-500'>
        or upload audio or mp3
        <input
          onChange={handleFileChange}
          type="file"
          accept="audio/*"
          className='hidden'
        />
      </label>

      <div className='mt-4 p-4 bg-gray-100 rounded w-full max-w-3xl'>
        <h2 className='text-2xl font-bold'>Transcription:</h2>
        <p>{transcript}</p>
      </div>
    </main>
  );
}
