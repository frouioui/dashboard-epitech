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

/*const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;*/

const Input = styled.input`
padding: 0.5rem;
margin-bottom: 1.8rem;
font-size: 0.8rem;
border-top: none;
border-left: none;
border-right: none;
border-radius: 2px;
border-color: #8fd3f4;
font-family: "Tahoma" serif;
font-size: 1.3em;
`;

const Button = styled.button`
font-family: "Tahoma" serif;
flex: 1 1 auto;
margin: 5px;
padding: 10px;
text-align: center;
//text-transform: uppercase;
transition: 0.5s;
background-size: 200% auto;
color: white;
border: none;

/* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
box-shadow: 0 0 20px #eee;
border-radius: 15px;
background-image: linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%);
`;



const Error = styled.div`
  background-color: red;
`;

export { Form, Input, Button, Card, Error};