import React from 'react';
import PropTypes from 'prop-types';
import styles from './snap-lines.css';

export default function SnapLines({ lines, scale }) {
  const renderSnapLine = (line, idx) => {
    const width = line[1] === 0 ? '100%' : Math.ceil(1 / scale);
    const height = line[1] === 1 ? '100%' : Math.ceil(1 / scale);
    const top = line[1] === 0 ? line[0] : 0;
    const left = line[1] === 1 ? line[0] : 0;
    return (
      <div
        key={idx}
        style={{ width, height, top, left }}
        className={styles.snapLine}
      />
    );
  };

  return <div>{lines ? lines.map(renderSnapLine) : null}</div>;
}

SnapLines.propTypes = {
  lines: PropTypes.array,
  scale: PropTypes.number.isRequired,
};
