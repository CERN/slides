import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import './RenderHtml.css';

export const RenderHtml = ({ text }) => (
  <div className="bigger-text">{ReactHtmlParser(text)}</div>
);

RenderHtml.propTypes = {
  text: PropTypes.string,
};
