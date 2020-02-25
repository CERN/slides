export const initialState = {
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
}

export type presentationState = typeof initialState;
