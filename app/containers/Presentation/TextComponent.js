import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ContentEditable from 'react-contenteditable';
import { Rnd } from 'react-rnd';
import CKEditor from 'ckeditor4-react';
import ReactHtmlParser from 'react-html-parser';
// import { Text } from 'spectacle';
// import onClickOutside from 'react-onclickoutside';
import { selectDeckOfSlides, selectCurrentSlide } from './selectors';
import { addData, changePosition } from './actions';
import './styles.css';
export function TextComponent({
  DeckOfSlides,
  currentSlide,
  onAddData,
  textArrayEntry,
  onChangePosition,
}) {
  const node = useRef();

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  };
  // single-double click handlers
  const [textEdit, setTextEdit] = useState(false);
  // text's content
  const [text, setText] = useState(
    DeckOfSlides[currentSlide].textArray[textArrayEntry].data,
  );
  // text's position
  const pos = DeckOfSlides[currentSlide].textArray[textArrayEntry].position;
  const [position, setPosition] = useState({
    width: pos.width,
    height: pos.height,
    x: pos.x,
    y: pos.y,
  });
  const onChangeFunc = evt => {
    setText(evt.editor.getData());
    onAddData(textArrayEntry, evt.editor.getData());
  };

  const onDoubleClick = evt => {
    evt.preventDefault();
    // setTextMove(false);
    setTextEdit(true);
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      // then move
      return;
    }
    // outside click
    setTextEdit(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const onDragStop = posi => {
    setPosition(posi);
    onChangePosition(textArrayEntry, posi);
  };
  // {/* <div left={`${position.x}px`} top={`${position.y}px`}> */ }
  // {/* </div> */}

  return (
    <div ref={node} onDoubleClick={onDoubleClick}>
      {textEdit ? (
        <CKEditor
          // this is to prevent an error with the editor that multiple instances of the editor exists
          // eslint-disable-next-line no-return-assign
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
          data={text}
          type="inline"
          onChange={onChangeFunc}
        />
      ) : (
        <Rnd
          className="text-style"
          style={style}
          size={{ width: position.width, height: position.height }}
          position={{ x: position.x, y: position.y }}
          onDragStop={(e, d) => {
            console.log('..........', d.x, d.y);
            onDragStop({
              width: position.width,
              height: position.height,
              x: d.x,
              y: d.y,
            });
          }}
          onResizeStop={(e, dir, ref, delta, posi) => {
            onDragStop({
              width: ref.style.width,
              height: ref.style.height,
              ...posi,
            });
          }}
          minWidth={500}
          minHeight={70}
          bounds="body"
        >
          {ReactHtmlParser(text)}
        </Rnd>
      )}
    </div>
  );
}

TextComponent.propTypes = {
  DeckOfSlides: PropTypes.array,
  currentSlide: PropTypes.number,
  onAddData: PropTypes.func,
  textArrayEntry: PropTypes.number,
  onChangePosition: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAddData: (id, data) => dispatch(addData(id, data)),
    onChangePosition: (id, position) => dispatch(changePosition(id, position)),
  };
}

export default connect(
  state => ({
    DeckOfSlides: selectDeckOfSlides(state),
    currentSlide: selectCurrentSlide(state),
  }),
  mapDispatchToProps,
)(TextComponent);
