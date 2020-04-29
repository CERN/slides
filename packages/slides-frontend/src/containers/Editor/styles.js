export const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

export const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

export const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

export const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};
export const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

export const activeStyle = {
  borderColor: '#2196f3',
};

export const acceptStyle = {
  borderColor: '#00e676',
};

export const rejectStyle = {
  borderColor: '#ff1744',
};
