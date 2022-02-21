import librosa
import librosa.display
import matplotlib
import Constants


def waveform(signal, sr, x_axis, y_axis):
    librosa.display.waveshow(signal, sr=sr)
    matplotlib.pyplot.xlabel(x_axis)
    matplotlib.pyplot.ylabel(y_axis)
    matplotlib.pyplot.show()


COVID_POSITIVE_PATH = "../Train/covid-positive/covid-positive.wav"
COVID_NEGATIVE_PATH = "../Train/covid-negative/covid-negative.wav"

# covid positive waveform
waveform(Constants.COVID_POS_SIGNAL,
         Constants.COVID_POS_SR,
         "Time",
         "Amplitude")

# covid negative waveform
waveform(Constants.COVID_NEG_SIGNAL,
         Constants.COVID_NEG_SR,
         "Time",
         "Amplitude")
