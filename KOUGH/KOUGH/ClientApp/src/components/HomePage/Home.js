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
                <div className='icon-container'>
                    <i className='fas fa-virus icon'></i>
                </div>
                <div className='text-container'>
                  <p>
                    Info about the app ksndflknsdfs sdn lsdng sdmv ld;sd ls;s dl sd  sd lvnsld nsdn lsdnl sdv sdl vnsldn 
                  </p>
                </div>
              </li>

              <li className='text-list'>
                <div className='icon-container'>
                    <i className="fas fa-lungs-virus icon"></i>
                </div>
                <div className='text-container'>
                  <p>
                  Info about the app ksndflknsdfs sdn lsdng sdmv ld;sd ls;s dl sd  sd lvnsld nsdn lsdnl sdv sdl vnsldn 
                  </p>
                </div>
              </li>
              
              <li className='text-list'>
                <div className='icon-container'>
                    <i className="fas fa-virus icon"></i>
                </div>
                <div className='text-container'>
                  <p>
                  Info about the app ksndflknsdfs sdn lsdng sdmv ld;sd ls;s dl sd  sd lvnsld nsdn lsdnl sdv sdl vnsldn 
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
