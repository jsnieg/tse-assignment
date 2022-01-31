import React, { Component } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

export class AudioRecorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioDetails: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                    h: 0,
                    m: 0,
                    s: 0
                }
            }
        };
    }

    handleAudioStop(data) {
        console.log(data)
        this.setState({ audioDetails: data });
    }

    render() {
        return (
            <div>
                <Recorder
                    record={true}
                    title={"Record your voice"}
                    showUIAudio
                    handleAudioStop={data => this.handleAudioStop(data)}
                    mimeTypeToUseWhenRecording={`audio/webm`}
                />
            </div>
        );
    };
};
