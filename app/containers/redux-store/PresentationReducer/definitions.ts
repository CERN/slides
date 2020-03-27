export const initialState = {
    isPhoenixMode: false, // two modes, so bool, is Phoenix or is Browser
    username: 'achionis',
    theme: 'CERN 1',
    title: 'New Presentation',
    description: 'No description yet',
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
