import React from 'react';
import styled from 'styled-components';

const AdminPost = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <p className="heading">Most Reachable Post on the App</p>
          <p className="stats">
            <span>Reach: <strong className="highlight">15,000</strong></span>
            <span>Engagement: <strong className="highlight">5,000</strong></span>
          </p>
          <p className="para">
            This post has garnered the highest reach and engagement. It is an essential part of the current trending topics and has sparked significant user interaction.
          </p>
          <button className="btn">View Details</button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 400px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    overflow: hidden;
    border-radius: 15px;
    background: rgb(225, 239, 253);
    transition: all 0.5s ease;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    transition: all 0.5s ease;
  }

  .heading {
    font-weight: 700;
    font-size: 32px;
    color: #000000;
  }

  .stats {
    font-size: 16px;
    color: #1a3a56;
    font-weight: 600;
    display: flex;
    gap: 20px;
  }

  .highlight {
    font-size: 22px;
    font-weight: 800;
    color:rgb(173, 149, 70); /* Gold highlight */
    transition: color 0.3s ease;
  }

  .highlight:hover {
    color:rgb(165, 137, 70); /* Slightly darker gold on hover */
  }

  .para {
    font-size: 14px;
    line-height: 1.6;
    color: #000000;
  }

  .btn {
    color: #ffffff;
    text-decoration: none;
    padding: 12px 20px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: #000000;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    transition: all 0.3s ease;
  }

  .card:hover {
    box-shadow: 0 0 25px rgba(9, 117, 241, 0.8);
  }

  .content .btn:hover {
    background: transparent;
    color: #000000;
    border: 2px solid #000000;
  }

  .content .btn:active {
    box-shadow: none;
  }
`;

export default AdminPost;
