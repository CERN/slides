export const initialState = {
    isPhoenixMode: false, // two modes, so bool, is Phoenix or is Browser, not here is DANGEROUS
    presentationMode: false,
    theme: 'CERN 1',
    title: '',
    backgroundColor: '#0053A1',
    isReady: false,
    //
    assetsPath: '',
    //
    imgUploadRequest: false,
    saveRequest: false,
    loadRequest: false,
    styleRequest: false,
    themeRequest: false,
}

export type presentationState = typeof initialState;
