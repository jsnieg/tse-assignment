import librosa
import numpy as np
import matplotlib.pyplot
import Constants


def FFT_graph(left_frequency, left_magnitude):
    matplotlib.pyplot.plot(left_frequency, left_magnitude)
    matplotlib.pyplot.xlabel("Frequency")
    matplotlib.pyplot.ylabel("Magnitude")
    matplotlib.pyplot.show()


def calc_FFT(signal, sr):
    #  Fast Fourier Transform (fft) -> Spectrum
    fft = np.fft.fft(signal)
    magnitude = np.abs(fft)

    'linspace -> collection of evenly spaced numbers in an interval'
    frequency = np.linspace(0, sr, len(magnitude))

    left_frequency = frequency[:int(len(frequency)/2)]
    left_magnitude = magnitude[:int(len(frequency)/2)]

    return left_frequency, left_magnitude


frequency, magnitude = calc_FFT(
    Constants.COVID_POS_SIGNAL,
    Constants.COVID_POS_SR)

FFT_graph(frequency, magnitude)


frequency, magnitude = calc_FFT(
    Constants.COVID_NEG_SIGNAL,
    Constants.COVID_NEG_SR)

FFT_graph(frequency, magnitude)
