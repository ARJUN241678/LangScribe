import React from 'react';

export default function FileDisplay(props) {
  const { handleAudioReset, file, audioStream } = props;

  return (
    <div>
      <main className='flex-1 p-4 bg-400 flex flex-col justify-center items-center space-y-4'>
        <h1 className='text-6xl font-bold'>
          Your<span className='text-blue-400'>File</span>
        </h1>
        {file && <p className='text-xl'>{file.name}</p>}
        <button onClick={handleAudioReset} className='mt-4 px-4 py-2 bg-red-400 text-white rounded'>
          Reset
        </button>
      </main>
    </div>
  );
}

