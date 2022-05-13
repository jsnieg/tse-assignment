import React from 'react';
import AudioRecorder from './AudioRecorder';
import { 
  render, 
  screen, 
  getAllByRole, 
  getByLabelText, 
  getByText, 
  fireEvent,
  waitFor
} from '../utils-test';


const getStartButton = () => {
  return screen.getByRole('button', { name: /start-button/i });
}

const getSaveButton = () => {
  return screen.getByRole('button', { name: /save-button/i });
}

const getCancelButton = () => {
  return screen.getByRole('button', { name: /cancel-button/i });
}

let mockRecorderState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  isRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
}

const mockHandlers = {
  startRecording: jest.fn(),
  cancelRecording: jest.fn(),
  saveRecording: jest.fn()
}


describe('AudioRecorder', () => {

  it('renders without crashing', () => {
    const {container} = render(
      <AudioRecorder 
        recorderState={mockRecorderState}
        handlers={mockHandlers} />
    );

    // renders recording time 
    const recorderMins = getByLabelText(container, 'recording-minutes');
    const recorderSecs = getByLabelText(container, 'recording-seconds');
    expect(recorderMins).toBeVisible();
    expect(recorderSecs).toBeVisible();
  
    const minutes = getByText(recorderMins, "00");
    expect(minutes).toBeVisible();

    const seconds = getByText(recorderSecs, "00");
    expect(seconds).toBeVisible();
  
    // renders controls 
    const controls = getByLabelText(container, 'controls');
    expect(controls).toBeVisible();
  
    // renders start button only
    const buttons = getAllByRole(container, 'button');
    expect(buttons).toHaveLength(1);
  
    // renders start button 
    const startButton = getStartButton(container);
    expect(startButton).toBeVisible();
  
    // renders icon
    const startButtonIcon = getByLabelText(startButton, 'icon');
    expect(startButtonIcon).toBeVisible();
  });

  describe('control buttons', () => {

    it('calls startRecording on start button click', async() => {
      render(
        <AudioRecorder 
          recorderState={mockRecorderState}
          handlers={mockHandlers} />
      );
  
      // click start button
      const startButton = getStartButton();
      fireEvent.click(startButton);
  
      // startRecording has been called one time
      await waitFor(() => {
        expect(mockHandlers.startRecording).toHaveBeenCalledTimes(1)
      });
    });

    it('displays save and cancel buttons when recording', async() => {
      mockRecorderState = {
        ...mockRecorderState,
        isRecording: true
      }
  
      const {container} = render(
        <AudioRecorder 
          recorderState={mockRecorderState}
          handlers={mockHandlers} />
      );

      // renders controls 
      const controls = getByLabelText(container, 'controls');
      expect(controls).toBeVisible();
  
      // two buttons displayed
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
  
      // save button displayed
      const saveButton = getSaveButton();
      expect(saveButton).toBeVisible();
  
      // cancel button dispalyed
      const cancelButton = getCancelButton();
      expect(cancelButton).toBeVisible();
    });

    describe('save button', () => {

      it('renders save button properly', () => {
        mockRecorderState = {
          ...mockRecorderState,
          isRecording: true
        }

        render(
          <AudioRecorder 
            recorderState={mockRecorderState}
            handlers={mockHandlers} />
        );
    
        // renders start button 
        const saveButton = getSaveButton();
        expect(saveButton).toBeVisible();
      
        // renders icon
        const saveButtonIcon = getByLabelText(saveButton, 'icon');
        expect(saveButtonIcon).toBeVisible();
      });

      it('is disabled when recordingSeconds = 0', async() => {
        mockRecorderState = {
          ...mockRecorderState,
          recordingSeconds: 0,
          isRecording: true
        }

        render(
          <AudioRecorder 
            recorderState={mockRecorderState}
            handlers={mockHandlers} />
        );

        // click save button
        const saveButton = getSaveButton();
        fireEvent.click(saveButton);
    
        // saveRecording is not called on click
        await waitFor(() => {
          expect(mockHandlers.saveRecording).toHaveBeenCalledTimes(0)
        });
      });

      it('calls saveRecording on click', async() => {
        mockRecorderState = {
          ...mockRecorderState,
          recordingSeconds: 1,
          isRecording: true
        }

        render(
          <AudioRecorder 
            recorderState={mockRecorderState}
            handlers={mockHandlers} />
        );

        // click save button
        const saveButton = getSaveButton();
        fireEvent.click(saveButton);
    
        // saveRecording has been called once
        await waitFor(() => {
          expect(mockHandlers.saveRecording).toHaveBeenCalledTimes(1)
        });
      });
    });

    describe('cancel button', () => {
      it('renders cancel button properly', () => {
        mockRecorderState = {
          ...mockRecorderState,
          isRecording: true
        }
    
        render(
          <AudioRecorder 
            recorderState={mockRecorderState}
            handlers={mockHandlers} />
        );

        // renders start button 
        const cancelButton = getCancelButton();
        expect(cancelButton).toBeVisible();
      
        // renders icon
        const cancelButtonIcon = getByLabelText(cancelButton, 'icon');
        expect(cancelButtonIcon).toBeVisible();
      });

      it('calls cancelRecording on click', async() => {
        mockRecorderState = {
          ...mockRecorderState,
          recordingSeconds: 1,
          isRecording: true
        }

        render(
          <AudioRecorder 
            recorderState={mockRecorderState}
            handlers={mockHandlers} />
        );

        // click cancel button
        const cancelButton = getCancelButton();
        fireEvent.click(cancelButton);
    
        // cancelRecording has been called once
        await waitFor(() => {
          expect(mockHandlers.cancelRecording).toHaveBeenCalledTimes(1)
        });
      });
    });
  });
});
