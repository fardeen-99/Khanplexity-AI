import React from 'react';
import styled from 'styled-components';

export const ButtonStyle = () => {
    return (
        <StyledWrapper>
            <button className="button type1">
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    height: 50px;
    width: 150px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
  }

  .button:hover {
    box-shadow: .5px .5px 150px #252525;
  }

  .type1::after {
    content: "Thanks";
    height: 50px;
    width: 150px;
    background-color: #008080;
    color: #fff;
    position: absolute;
    top: 0%;
    left: 0%;
    transform: translateY(50px);
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
  }

  .type1::before {
    content: "Hover Me";
    height: 50px;
    width: 150px;
    background-color: #fff;
    color: #008080;
    position: absolute;
    top: 0%;
    left: 0%;
    transform: translateY(0px) scale(1.2);
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
  }

  .type1:hover::after {
    transform: translateY(0) scale(1.2);
  }

  .type1:hover::before {
    transform: translateY(-50px) scale(0) rotate(120deg);
  }`;

export const Card = ({ children, className }) => {
    return (
        <StyledWrapperCard className="group h-full w-full">
            <div className="outer">
                <div className="dot" />
                <div className={`card transition-all ${className || ''}`}>
                    <div className="ray" />
                    {children}
                    <div className="line topl" />
                    <div className="line leftl" />
                    <div className="line bottoml" />
                    <div className="line rightl" />
                </div>
            </div>
        </StyledWrapperCard>
    );
}

const StyledWrapperCard = styled.div`
width: 100%;
height: 100%;

.outer {
width: 100%;
height: 100%;
min-height: 250px;
border-radius: 24px;
padding: 1px;
background: radial-gradient(
circle 250px at 0% 0%,
rgba(120, 120, 120, 0.15),
rgba(255, 255, 255, 0.03)
);
position: relative;
overflow: hidden;
transition: all 0.3s ease-in-out;
}

.outer:hover {
background: radial-gradient(
circle 300px at 0% 0%,
rgba(160, 160, 160, 0.25),
rgba(255, 255, 255, 0.06)
);
}

.dot {
width: 5px;
aspect-ratio: 1;
position: absolute;
background-color: #d1d5db;
box-shadow: 0 0 12px 2px rgba(255, 255, 255, 0.4);
border-radius: 100px;
z-index: 2;
right: 15%;
top: 10%;
animation: moveDot 6s linear infinite;
}

@keyframes moveDot {
0%, 100% {
top: 10%;
right: 15%;
}
25% {
top: 10%;
right: calc(100% - 35px);
}
50% {
top: calc(100% - 30px);
right: calc(100% - 35px);
}
75% {
top: calc(100% - 30px);
right: 15%;
}
}

.card {
z-index: 1;
width: 100%;
height: 100%;
border-radius: 23px;
border: none;
background: radial-gradient(
circle 300px at 0% 0%,
rgba(20, 20, 20, 0.85),
rgba(5, 5, 5, 0.95)
);
backdrop-filter: blur(18px);
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
position: relative;
color: #e5e7eb;
padding: 2rem;
box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.card:hover {
background: radial-gradient(
circle 300px at 0% 0%,
rgba(30, 30, 30, 0.9),
rgba(0, 0, 0, 1)
);
}

.card .text {
font-weight: 700;
font-size: 3.5rem;
background: linear-gradient(
90deg,
#666,
#ffffff,
#999
);
background-clip: text;
color: transparent;
}

.line {
width: 0;
height: 0px;
position: absolute;
background-color: transparent;
pointer-events: none;
}

.topl {
top: 10%;
background: linear-gradient(
90deg,
rgba(255, 255, 255, 0.15),
transparent
);
}

.bottoml {
bottom: 10%;
}

.leftl {
left: 10%;
width: 0px;
height: 0px;
background: linear-gradient(
180deg,
rgba(255, 255, 255, 0.15),
transparent
);
}

.rightl {
right: 10%;
width: 1px;
height: 100%;
}
`;

export const ButtonLogin = () => {
  return (
    <StyledWrapper3>
      <button className="button" data-text="Awesome">
        <span className="actual-text">&nbsp;uiverse&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;uiverse&nbsp;</span>
      </button>
    </StyledWrapper3>
  );
}

const StyledWrapper3 = styled.div`
  /* === removing default button style ===*/
  .button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  /* button styling */
  .button {
    --border-right: 6px;
    --text-stroke-color: rgba(255,255,255,0.6);
    --animation-color: #37FF8B;
    --fs-size: 2em;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }
  /* this is the text, when you hover on button */
  .hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
  }
  /* hover */
  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color))
  }`;

