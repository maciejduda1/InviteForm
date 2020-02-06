import React from 'react';
import styles from "./Video.module.css";
import video1 from "../../images/fog.mp4";
import PropTypes from "prop-types";


const Video = ({ playStatus }) => (
  <div className={styles.videoContainer}>
    <video autoPlay={playStatus} muted className={styles.video}>
      <source src={video1} type='video/mp4' />
    </video>
  </div>
);

Video.propTypes = {
  playStatus: PropTypes.bool.isRequired
};

export default Video;
