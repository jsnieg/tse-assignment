import React, { Component } from 'react';
import useRecorder from '../Audio/useRecorder';
import AudioRecorder from '../Audio/AudioRecorder';
import './Home.css';

export default function Home() {
  const { recorderState, ...handlers } = useRecorder(); 

  return (
    <div>
      <section className='top-part'>
          <div className='title-container center'>
            <h1 className='title'>
              COVID-19 and Asthma App
            </h1>
          </div>

          <div className='list-container'>
            <ul className='list'>

              <li className='text-list'>
                <div className='icon-container center'>
                  <i className='fas fa-virus center icon'></i>
                </div>
                <div className='text-container'>
                  <p>
                    COVID-19 and worsening Asthma symptoms are indistinguishable, can you tell the difference?  
                  </p>
                </div>
              </li>

              <li className='text-list'>
                <div className='icon-container center'>
                  <i className="fas fa-shield-virus center icon"></i>
                </div>
                <div className='text-container'>
                  <p>
                    This app records your breathing and voice to differentiate between the two.  
                  </p>
                </div>
              </li>
              
              <li className='text-list'>
                <div className='icon-container'>
                  <i className="fas fa-lungs-virus center icon"></i>
                </div>
                <div className='text-container'>
                  <p>
                    Click the blue microphone to record.  
                  </p>
                </div>
              </li>

            </ul>
          </div>
        
      </section>
      <div className='title-container center'>
        <h4 className='recorder-title'>
          Please Say...
        </h4>
      </div>
      <div className='center'>
        <p>"Hello, I have Coronavirus!"</p>
      </div>

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
