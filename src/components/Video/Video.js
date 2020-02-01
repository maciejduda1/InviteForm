import React from "react";
import styles from "./Video.modules.css";
import video1 from "../../images/fog.mp4";
import PropTypes from "prop-types";

const Video = ({ playStatus }) => (
  <div className={styles.Video}>
    <video autoPlay={playStatus} muted id='myVideo' className={styles.Video}>
      <source src={video1} type='video/mp4' />
    </video>
  </div>
);

Video.propTypes = {
  playStatus: PropTypes.bool.isRequired
};

export default Video;
