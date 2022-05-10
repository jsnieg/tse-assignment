import os
import json
import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt

SAMPLE_RATE = 22050
HOP_LENGTH = 512
n_MFCC = 13
n_FFT = 2048


def getLabel(metadata):
    status = metadata['covid_status']
    covid_positive = not ((status == 'healthy') or (status == 'no_resp_illness_exposed'))
    has_asthma = False

    try:
        has_asthma = metadata['asthma'] == 'True'
    except:
        if covid_positive:
            return 2
        else:
            return 0

    
    if has_asthma:
        if not covid_positive:
            return 1
        return 3
   
    return 4



def SaveSpectrogram(filename, log_spectrogram, sr):

    librosa.display.specshow(
        log_spectrogram,
        sr=sr,
        hop_length=HOP_LENGTH
    )

    plt.savefig('{}.png'.format(filename), format='png')
    plt.close()

def STFT(signal, hop_length, n_samples):
    return librosa.core.stft(
        signal,
        hop_length=hop_length,
        n_fft=n_samples)


def preProcess(dataset_path):
    data = {
        "mapping": [
            'Healthy',
            'Asthma',
            'Covid',
            'Asthma-Covid',
            
        ],
        "labels": [],
    }

    for i, (dirpath, _, filenames) in enumerate(os.walk(dataset_path)):
        if dirpath == dataset_path:
            continue

        if len(filenames) == 0:
            continue

        metadata = None
        label = None

        for file in filenames:
            path = os.path.join(dirpath, file)

            # read metadata.json to get label
            if str(file) == 'metadata.json':
                f = open(os.path.join(dirpath, 'metadata.json'))
                metadata = json.load(f)
                label = getLabel(metadata)

                try:
                    # load audio using librosa
                    signal, sampleRate = librosa.load(os.path.join(dirpath, 'breathing-deep.wav'), sr=SAMPLE_RATE)
                    # perform stft
                    log_spectrogram = librosa.amplitude_to_db(
                        np.abs(
                            STFT(
                                signal,
                                HOP_LENGTH,
                                2048
                            )
                        )
                    )
                    print(label)
                    file_path = "../images/{}/{}".format(data["mapping"][label], i)
                    
                    SaveSpectrogram(
                        file_path,
                        log_spectrogram,
                        sampleRate,
                    )
                    print("saved to ../images/{}".format(data["mapping"][label]))

                    # store label
                    data["labels"].append(label)

                except:
                    print("\nError processing")
                    continue     

    return data


# pre-process only breathing-heavily.wav for training
training_dataset_path = '../Data/CoronaHack-Respiratory-Sound-Dataset/data/train'
train_data = preProcess(training_dataset_path)

# pre-process only breathing-heavily.wav for testing
test_dataset_path = '../Data/CoronaHack-Respiratory-Sound-Dataset/data/test'
test_data = preProcess(test_dataset_path)

