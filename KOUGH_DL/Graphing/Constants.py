import librosa


COVID_POSITIVE_PATH = "../Example/covid-positive/covid-positive.wav"
COVID_POS_SIGNAL, COVID_POS_SR = librosa.load(COVID_POSITIVE_PATH, sr=22050)

COVID_NEGATIVE_PATH = "../Example/covid-negative/covid-negative.wav"
COVID_NEG_SIGNAL, COVID_NEG_SR = librosa.load(COVID_NEGATIVE_PATH, sr=22050)

# The window to perform a stft per FFT
N_SAMPLES_PER_FFT = 2048

# The amount we are tranfroming each FFT to the right
HOP_LENGTH = 512
