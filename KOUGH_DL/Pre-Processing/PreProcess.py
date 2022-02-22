import math
import os
import librosa
import Constants as const
import FileService


def CreateMFCCs(dataset_path,
                json_path,
                n_MFCC,
                n_FFT,
                hopLength,
                numberOfSegments):

    data = {
        "mapping": [],
        "mfcc": [],
        "labels": [],
    }

    numSamplesPerSegment = int(
        const.SAMPLES_PER_TRACK / numberOfSegments)

    MFCC_vectorPerSegment = math.ceil(
        numSamplesPerSegment / hopLength)

    # iterate through directories
    i = 0
    for dirpath, dirnames, filenames in os.walk(dataset_path):
        # don't bother with root dataset dir
        if (dirpath == dataset_path):
            continue

        # get semantic label
        dirpath_components = dirpath.split("/")
        label = dirpath_components[-1]
        data["mapping"].append(label)
        print("\nProcessing {}".format(label))

        # process files
        for file in filenames:
            path = os.path.join(dirpath, file)

            # load audio
            signal, sampleRate = librosa.load(path, sr=const.SAMPLE_RATE)

            # process segments to get MFCC
            for segment in range(numberOfSegments):
                start = numSamplesPerSegment * segment
                end = start + numSamplesPerSegment

                MFCC = librosa.feature.mfcc(
                    y=signal[start:end],
                    sr=sampleRate,
                    n_fft=n_FFT,
                    n_mfcc=n_MFCC,
                    hop_length=hopLength
                ).T

                # store mfcc for segment
                if len(MFCC) == MFCC_vectorPerSegment:
                    data["mfcc"].append(MFCC.tolist())
                    data["labels"].append(i-1)
                    print("{}, segment:{}".format(path, segment))

    FileService.write_json(json_path, data)
    i += 1


if __name__ == "__main__":
    CreateMFCCs(
        const.DATASET_PATH,
        const.JSON_PATH,
        n_MFCC=13,
        n_FFT=2048,
        hopLength=512,
        numberOfSegments=10
    )
