import React from "react";
import styled from "styled-components";

const ThreeCards = ({ title, icon, value }) => {
  return (
    <StyledWrapper>
      <a className="card" href="#">
        <div className="containers">
          <div className="icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height={30}
              width={30}
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                stroke="#3881a5"
                d={icon}
              />
            </svg>
          </div>
          <div className="title mb-3">{title}</div>
          <div className="subtitle">{value}</div>
        </div>
      </a>
    </StyledWrapper>
  );
};

const CardContainer = () => {
  const cardData = [
    {
      title: "Post Reach",
      icon: "M20 12H4M4 12L9 17M4 12L9 7",
      value: `${Math.floor(Math.random() * 1000)}`,
    }, // Arrow icon
    {
      title: "Post Engagement",
      icon: "M12 2V12L8 9L12 12L16 9L12 2",
      value: `${Math.floor(Math.random() * 500)}`,
    }, // Engagement icon (arrows)
    {
      title: "New Pages Likes",
      icon: "M12 2L16 6L12 10L8 6L12 2M12 10C9 10 6 13 6 16H18C18 13 15 10 12 10Z",
      value: `${Math.floor(Math.random() * 100)} likes`,
    }, // Like icon for the new pages
  ];

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <ThreeCards
          key={index}
          title={card.title}
          icon={card.icon}
          value={card.value}
        />
      ))}
    </div>
  );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 300px;
    margin: 60px 100px 20px 0; /* Added space to the right and top of the cards */
    padding: 30px 25px;
    flex-direction: column;
    align-items: center; /* Center items horizontally */
    border-radius: 15px;
    border: 2px solid #d1d9e6;
    background: #e9f2ff;
    transition: 0.3s all;
    text-decoration: none;
  }

  .card-container {
    display: flex;
    justify-content: center; /* Center all cards horizontally */
    gap: 15px; /* Space between cards */
    flex-wrap: wrap; /* Wrap to the next line on smaller screens */
    align-items: center; /* Center items vertically */
    margin-top: 40px; /* Space on top of the card container */
  }

  .title {
    color: #072713;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    transition: 0.4s all;
  }

  .subtitle {
    color: #7e8882;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    transition: 0.4s all;
  }

  .icon-circle {
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(209, 232, 255);
  }

  .card:hover {
    background: #3881a5; /* Change the hover background to your desired color */
    border-color: #2d6c92;
    transition: 0.4s all;
  }

  .card:hover .title,
  .card:hover .subtitle {
    color: #fff;
    transition: 0.4s all;
  }

  .btnRound {
    display: none; /* Share button removed */
  }
`;

export default CardContainer;
