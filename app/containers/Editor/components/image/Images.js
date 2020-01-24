import React from 'react';
import { Icon } from 'semantic-ui-react';
import Image from 'spectacle';
// maybe I should put image from spectacle
export default props =>
  props.images.map((image, i) => (
    <div key={i} className="fadein">
      <div onClick={() => props.removeImage(image.id)} className="delete">
        <Icon name="delete" />
      </div>
      <img src={image.src} alt="" onError={() => props.onError(image.id)} />
    </div>
  ));

// interface ImageProps {
//   alt?: string;
//   className?: BaseProps['className'];
//   display?: string;
//   height?: number | string;
//   margin?: BaseProps['margin'];
//   padding?: BaseProps['padding'];
//   src?: string;
//   width?: number | string;
// }
