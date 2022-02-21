import librosa


COVID_POSITIVE_PATH = "../Train/covid-positive/covid-positive.wav"
COVID_POS_SIGNAL, COVID_POS_SR = librosa.load(COVID_POSITIVE_PATH, sr=22050)

COVID_NEGATIVE_PATH = "../Train/covid-negative/covid-negative.wav"
COVID_NEG_SIGNAL, COVID_NEG_SR = librosa.load(COVID_NEGATIVE_PATH, sr=22050)
