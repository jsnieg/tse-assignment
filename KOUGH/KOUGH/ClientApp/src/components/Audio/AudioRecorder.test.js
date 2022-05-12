import React from 'react';
import AudioRecorder from './AudioRecorder';
import { 
  render, 
  screen, 
  getAllByRole, 
  getByLabelText, 
  getByText 
} from '../utils.test';


const mockRecorderState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
}

const mockHandlers = () => {
  return {
    mockRecorderState,
    startRecording: () => {},
    cancelRecording: () => {},
    saveRecording: () => {}
  };
}


it('renders without crashing', () => {
  const {container} = render(<AudioRecorder 
    recorderState={mockRecorderState}
    handlers={mockHandlers} />);

  // renders recording time 
  const recorderMins = getByLabelText(container, 'recording minutes');
  const recorderSecs = getByLabelText(container, 'recording seconds');
  expect(recorderMins).toBeVisible();
  expect(recorderSecs).toBeVisible();

  const minutes = getByText(recorderMins, "00");
  const seconds = getByText(recorderSecs, "00");
  expect(minutes).toBeVisible();
  expect(seconds).toBeVisible();

  // renders controls container 
  const controls = getByLabelText(container, 'controls');
  expect(controls).toBeVisible();

  // renders start button 
  const buttons = getAllByRole(container, 'button');
  expect(buttons).toHaveLength(1);
  
  // renders button icon 
  const startButton = buttons[0];
  expect(getByLabelText(startButton, 'icon')).toBeVisible();
});
