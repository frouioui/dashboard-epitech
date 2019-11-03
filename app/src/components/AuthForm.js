import styled from 'styled-components';


const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 70%;
`;

const Input = styled.input`
margin-top: 3rem;
padding: 2.5rem;
margin-bottom: 2.8rem;
font-size: 0.8rem;
border-top: none;
border-left: none;
border-right: none;
border-radius: 2px;
border-color: #8fd3f4;
font-size: 1.5em;
`;

const Button = styled.button`
font-size: 1.5em;

flex: 1 1 auto;
margin: 5px;
padding: 18px;
text-align: center;
transition: 0.5s;
background-size: 200% auto;
color: white;
border: none;
margin-top: 6rem;
/* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
box-shadow: 0 0 20px #eee;
border-radius: 15px;
background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%);
`;



const Error = styled.div`
  color: red;
  margin-top: -16rem;
`;

export { Form, Input, Button, Card, Error };