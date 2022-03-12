import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';

const fileBtnStyles = theme => ({
  wrapper: {
    position: 'relative',
    width: '260px',
    height: '50px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#D3D3D3',
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: '50px',
    borderRadius: '3px',
    fontSize: '30px',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: '0',
    width: '100%',
    height: '100%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const FileUpload = ({ classes, text, onFileRead, acceptMimeType }) => (
  <View noFlex className={classes.wrapper}>
    {text}
    <input
      className={classes.input}
      onChange={event => {
        onFileRead(event.target.files[0]);
      }}
      type="file"
      accept={acceptMimeType}
    />
  </View>
);

FileUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onFileRead: PropTypes.func.isRequired,
  acceptMimeType: PropTypes.string,
};

export default injectSheet(fileBtnStyles)(FileUpload);
