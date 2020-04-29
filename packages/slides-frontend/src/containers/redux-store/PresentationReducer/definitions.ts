export const initialState = {
    isPhoenixMode: false, // two modes, so bool, is Phoenix or is Browser, not here is DANGEROUS
    username: 'achionis',
    theme: 'CERN 1',
    title: 'New Presentation',
    backgroundColor: '#0053A1',
    isReady: false,
    //
    assetsPath: '',
    currentSlide: 0,
    //
    imgUploadRequest: false,
    saveRequest: false,
    loadRequest: false,
    styleRequest: false,
}

export type presentationState = typeof initialState;
