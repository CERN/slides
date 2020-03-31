// import React, {forwardRef, setState} from 'react';
// import PropTypes from 'prop-types';
// import { Rnd } from 'react-rnd';

// const MoveResize = forwardRef(({ position, size }, ref) => {
//   const node = ref.current;
//   return (
//     <Rnd
//       size={{ width: size.width, height: size.height }}
//       position={{ x: position.x, y: position.y }}
//       onDragStop={(e, d) => {
//         setState({ x: d.x, y: d.y });
//       }}
//       onResizeStop={(e, direction, otherRef, delta, otherPosition) => {
//         setState({
//           width: otherRef.style.width,
//           height: otherRef.style.height,
//           ...otherPosition,
//         });
//       }}
//     >
//       001
//     </Rnd>
//   );
// });
// check and fix urgent