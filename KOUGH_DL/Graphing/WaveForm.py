import librosa
import librosa.display
import matplotlib
import Constants


def DisplayWaveForm(signal, sr, x_axis, y_axis):
    librosa.display.waveshow(signal, sr=sr)
    matplotlib.pyplot.xlabel(x_axis)
    matplotlib.pyplot.ylabel(y_axis)
    matplotlib.pyplot.show()


# covid positive waveform
DisplayWaveForm(
    Constants.COVID_POS_SIGNAL,
    Constants.COVID_POS_SR,
    "Time",
    "Amplitude")

# covid negative waveform
DisplayWaveForm(
    Constants.COVID_NEG_SIGNAL,
    Constants.COVID_NEG_SR,
    "Time",
    "Amplitude")
