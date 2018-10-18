import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid rgba(0,0,0,0.1);

  &[disabled] {
    cursor: no-drop;
    background-color: #e5e5e5;
  }
`;

export const Comment = styled.div`
  display: block;
  width: 100%;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.p`
  color: rgba(0,0,0,0.4);
`;

export const Button = styled.button`
  border: 0;
  padding: 5px;
  min-width: 100px;
  display: block;
  box-shadow: none;
  background-color: #e5e5e5;
`;

export const Message = styled.p`

`;

export const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

export const Preloader = styled.p`
  margin: 5px 0;
`;

export const Form = styled.form`
  margin-top: 30px;
`;
