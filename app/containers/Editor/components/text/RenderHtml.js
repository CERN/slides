import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import './RenderHtml.css';

export default function RenderHtml({ text }) {
  let txt = text;
  if (txt === '') {
    txt = '<p>Double Click to Edit</p>';
  }
  return <div className="bigger-text">{ReactHtmlParser(txt)}</div>;
}

RenderHtml.propTypes = {
  text: PropTypes.string,
};
