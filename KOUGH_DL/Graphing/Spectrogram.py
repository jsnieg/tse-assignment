import matplotlib.pyplot
import numpy as np
import librosa
import librosa.display
import Constants as const


def DisplaySpectrogram(log_spectrogram, sr, hop_length):
    librosa.display.specshow(
        log_spectrogram,
        sr=sr,
        hop_length=hop_length
    )
    matplotlib.pyplot.xlabel("Time (s)")
    matplotlib.pyplot.ylabel("Frequency (db)")
    matplotlib.pyplot.colorbar()
    matplotlib.pyplot.show()


def STFT(signal, hop_length, n_samples):
    return librosa.core.stft(
        signal,
        hop_length=hop_length,
        n_fft=n_samples)


# perform stft for covid negative example
log_spectrogram = librosa.amplitude_to_db(
    np.abs(
        STFT(
            const.COVID_NEG_SIGNAL,
            const.HOP_LENGTH,
            const.N_SAMPLES_PER_FFT
        )
    )
)

DisplaySpectrogram(
    log_spectrogram,
    const.COVID_NEG_SR,
    const.HOP_LENGTH
)


# perform stft for covid positive example
log_spectrogram = librosa.amplitude_to_db(
    np.abs(
        STFT(
            const.COVID_POS_SIGNAL,
            const.HOP_LENGTH,
            const.N_SAMPLES_PER_FFT
        )
    )
)

DisplaySpectrogram(
    log_spectrogram,
    const.COVID_POS_SR,
    const.HOP_LENGTH
)
