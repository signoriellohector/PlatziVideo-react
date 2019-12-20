import React, { useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
import NotFound from './NotFound';

//import Styles
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  // destructurando props
  const { match, playing, getVideoSource } = props;

  const { id } = match.params;
  const hasPlaying = Object.keys(playing).length > 0;

  useEffect(() => {
    getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : <NotFound />;
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
