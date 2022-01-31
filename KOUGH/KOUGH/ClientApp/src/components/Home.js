import React, { Component } from 'react';
import { AudioRecorder } from './AudioRecorder/AudioRecorder';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Hello, world!</h1>
        <div>
          <AudioRecorder />
        </div>
      </div>
    );
  }
}
