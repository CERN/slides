import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Rnd } from "react-rnd";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectDeckOfSlides, makeSelectCurrentSlide } from './selectors';
import { addData } from './actions';
import reducer from './reducer';

const key = 'text-component';

export function Presentation({
    DeckOfSlides,
    currentSlide,
    onAddData,

}) {
    useInjectReducer({ key, reducer });
    const style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px blue",
        background: "transparent"
    };
    return (
        <Rnd
            style={style}
            default={{
                x: 600,
                y: 500,
                width: 500,
                height: 70
            }}
            bounds="parent"
        >
            <Input transparent placeholder='Type something...' >
                {/* <CKEditor type="inline" data="<p>This is a CKEditor 5 WYSIWYG editor instance created by ️⚛️ React.</p>" />, */}
            </Input>>
            {/* <ReactQuill value={text} onChange={handleChange} modules={modules} formats={formats} placeholder="Type your text here" /> */}
        </Rnd>
    )
}

Presentation.propTypes = {
    DeckOfSlides: PropTypes.array,
    currentSlide: PropTypes.number,
    onAddData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    DeckOfSlides: makeSelectDeckOfSlides(),
    currentSlide: makeSelectCurrentSlide(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onAddData: id => dispatch(addData()),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Presentation);
