import React, { Component } from 'react';
import useRecorder from '../Audio/useRecorder';
import AudioRecorder from '../Audio/AudioRecorder';
import './Home.css';

export default function Home() {
  const { recorderState, ...handlers } = useRecorder(); 

  return (
    <div>
      <section className='top-part'>
        <div className='title-container'>
          <h1 className='title'>
            COVID-19 and Asthma App
          </h1>
        </div>

        <div className='list-container'>
          <ul>

            <li className='text-list'>
              <div className='icon-container'>
                <button className='btn-primary icon'>
                  <i class="fas fa-virus"></i>
                </button>
              </div>
              <div className='text-container'>
                <p>
                  list item 1
                </p>
              </div>
            </li>

            <li className='text-list'>
              <div className='icon-container'>
                <button className='btn-primary icon'>
                  <i class="fas fa-virus"></i>
                </button>
              </div>
              <div className='text-container'>
                <p>
                  list item 2
                </p>
              </div>
            </li>
            
            <li className='text-list'>
              <div className='icon-container'>
                <button className='btn-primary icon'>
                  <i class="fas fa-virus"></i>
                </button>
              </div>
              <div className='text-container'>
                <p>
                  list item 3
                </p>
              </div>
            </li>

          </ul>
        </div>
      </section>

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
