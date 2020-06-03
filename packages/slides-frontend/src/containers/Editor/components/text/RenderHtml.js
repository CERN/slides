import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import './RenderHtml.css';

export default function RenderHtml({ text }) {
  let txt = text;
  // how to handle empty text in text editor
  const test = txt.split('<p></p>\n').join('');
  if (test === '') {
    txt = '<p>Double Click to Edit</p>';
  }
  
  return <div className="bigger-text">{ReactHtmlParser(txt)}</div>;
}

RenderHtml.propTypes = {
  text: PropTypes.string,
};
