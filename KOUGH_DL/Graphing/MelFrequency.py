import librosa
import librosa.display
import matplotlib.pyplot
import Constants as const


def DisplayMel(MFCCs, sr, hop_length):
    librosa.display.specshow(
        data=MFCCs,
        sr=sr,
        hop_length=hop_length
    )

    matplotlib.pyplot.xlabel("Time (s)")
    matplotlib.pyplot.ylabel("MFCC")
    matplotlib.pyplot.colorbar()
    matplotlib.pyplot.show()


SR = [const.COVID_NEG_SR, const.COVID_POS_SR]
SIGNAL = [const.COVID_NEG_SIGNAL, const.COVID_POS_SIGNAL]

for i in range(0, len(SR)):
    # MFCCs -> Mel-Frequency Cepstral Coefficients
    MFCCs = librosa.feature.mfcc(
        y=SIGNAL[i],
        n_fft=const.N_SAMPLES_PER_FFT,
        hop_length=const.HOP_LENGTH,
        n_mfcc=13
    )

    DisplayMel(
        MFCCs,
        SR[i],
        const.HOP_LENGTH
    )
