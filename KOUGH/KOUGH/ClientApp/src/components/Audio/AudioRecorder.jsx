import React from "react";
import './AudioRecorder.css';
import '../../custom.css';

export default function AudioRecorder({ recorderState, handlers }) {
    const { recordingMinutes, recordingSeconds, isRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;

    return (
        <div className="controls-container">
            <div className="recorder-display">
                <div className="recording-time">
                {
                    isRecording &&
                    <div className="recording-indicator"></div>
                }

                <span aria-label="recording-minutes"> 
                    { recordingMinutes < 10 ? `0${recordingMinutes}` : recordingMinutes } 
                </span>

                <span>:</span>
                
                <span aria-label="recording-seconds"> 
                    { recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds } 
                </span>
                
                </div>
            </div>

            <div aria-label="controls" 
                 className="control-button-container">

                { isRecording && (
                    <div className="cancel-button-container center">
                        <button
                            className="cancel-button"
                            title="Cancel recording"
                            aria-label="cancel-button"
                            onClick={cancelRecording}
                        ><i aria-label="icon" className="fas fa-trash"></i>
                        </button>
                    </div>
                )}
                
                { isRecording ? (
                    <div className="save-button-container center">
                        <button
                            className="btn-primary start-button"
                            title="Save recording"
                            aria-label="save-button"
                            disabled={recordingSeconds === 0}
                            onClick={saveRecording}
                        ><i aria-label="icon" className="far fa-save"></i>
                        </button>
                    </div>
                    ) : (
                    <div className=".start-button-container center">
                        <button
                            className="btn-primary start-button"
                            title="Start recording"
                            aria-label="start-button"
                            onClick={startRecording}
                        ><i aria-label="icon" className="fas fa-microphone"></i>
                        </button>
                    </div>
                    )
                }
            </div>
        </div>
    );
}

