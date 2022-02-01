import React from "react";
import './AudioRecorder.css';
import '../../custom.css';

export default function AudioRecorder({ recorderState, handlers }) {
    const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;

    return (
        <div className="controls-container">
            <div className="recorder-display">
            <div className="recording-time">
                { initRecording && 
                    <div className="recording-indicator"></div>
                }

                <span> { 
                    recordingMinutes < 10 ? `0${recordingMinutes}` : recordingMinutes 
                } </span>
                <span>:</span>
                <span> { 
                    recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds 
                } </span>
                
                </div>
                { initRecording && (
                    <div className="cancel-button-container">
                        <button 
                            className="btn-primary cancel-button" 
                            title="Cancel recording" 
                            onClick={cancelRecording}
                        ><i class="fas fa-ban" size='2x'></i>
                        </button>
                    </div>
                )}
            </div>

            <div className="start-button-container">
                { initRecording ? (
                    <button
                        className="btn-primary start-button"
                        title="Save recording"
                        disabled={recordingSeconds === 0}
                        onClick={saveRecording}
                    ><i class="far fa-save" size='2x'></i>
                    </button>
                    ) : (
                    <button 
                        className="btn-primary start-button" 
                        title="Start recording" 
                        onClick={startRecording}
                    ><i class="fas fa-microphone" size='2x'></i>
                    </button> 
                    )
                }
            </div>
        </div>
    );
}

