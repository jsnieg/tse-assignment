import React, { Component } from 'react';
import useRecorder from './Audio/useRecorder';
import AudioRecorder from './Audio/AudioRecorder';

export default function Home() {
    const { recorderState, ...handlers } = useRecorder(); 

    return (
      <div>
        <section className='voice-recorder'>
          <div className='recorder-container'>
            <AudioRecorder 
              recorderState={recorderState}  
              handlers={handlers} />
          </div>
        </section>
      </div>
    );
}
