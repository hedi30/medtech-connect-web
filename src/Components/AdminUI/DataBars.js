import React from 'react';
import styled from 'styled-components';

const DataBars = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="skill-box">
          <span className="title">User Registrations</span>
          <div className="skill-bar">
            <span className="skill-per user-registrations">
              <span className="tooltip">80%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">Data Processing</span>
          <div className="skill-bar">
            <span className="skill-per data-processing">
              <span className="tooltip">65%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">Suspicious Posts Detection</span>
          <div className="skill-bar">
            <span className="skill-per suspicious-posts">
              <span className="tooltip">50%</span>
            </span>
          </div>
        </div>
        <div className="skill-box">
          <span className="title">Alumni Engagement</span>
          <div className="skill-bar">
            <span className="skill-per alumni-engagement">
              <span className="tooltip">70%</span>
            </span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    position: relative;
    max-width: 500px;
    width: 100%;
    background: #ececec;
    margin: 0 15px;
    padding: 10px 20px;
    border-radius: 7px;
  }

  .container .skill-box {
    width: 100%;
    margin: 25px 0;
  }

  .skill-box .title {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  .skill-box .skill-bar {
    height: 8px;
    width: 100%;
    border-radius: 6px;
    margin-top: 6px;
    background: rgba(0,0,0,0.1);
  }

  .skill-bar .skill-per {
    position: relative;
    display: block;
    height: 100%;
    width: 80%;  /* Default width to avoid shrinking issues */
    border-radius: 6px;
    background: #4070f4;
    animation: progress 0.4s ease-in-out forwards;
    opacity: 0;
  }

  .skill-per.user-registrations {
    width: 80%;
    animation-delay: 0.1s;
  }

  .skill-per.data-processing {
    width: 65%;
    animation-delay: 0.1s;
  }

  .skill-per.suspicious-posts {
    width: 50%;
    animation-delay: 0.2s;
  }

  .skill-per.alumni-engagement {
    width: 70%;
    animation-delay: 0.3s;
  }

  @keyframes progress {
    0% {
      width: 0;
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }

  .skill-per .tooltip {
    position: absolute;
    right: -14px;
    top: -28px;
    font-size: 9px;
    font-weight: 500;
    color: #fff;
    padding: 2px 6px;
    border-radius: 3px;
    background: #4070f4;
    z-index: 1;
  }

  .tooltip::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    height: 10px;
    width: 10px;
    z-index: -1;
    background-color: #4070f4;
    transform: translateX(-50%) rotate(45deg);
  }
`;

export default DataBars;
