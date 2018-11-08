import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 30px 20px 80px 20px;
  @media (min-width: 768px) {
    margin-top: 120px;
  }
`;
Wrapper.displayName = 'Wrapper';

export const FormContainer = styled.form`
  max-width: 915px;
  width: 100%;
  margin: 0 auto;
`;
FormContainer.displayName = 'FormContainer';

export const Row = styled.div`
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  justify-content: space - between;
  @media (min-width: 768px) {
    flex-flow: row;
  }
`;
Row.displayName = 'Row';

export const Name = styled.input`
  box-sizing: border-box;
  display: block;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 5px;
  min-width: 0;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 30px;
  letter-spacing: 1px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s;
  color: black;
  :invalid {
    box-shadow: none;
  }
  :focus {
    border-color: green;
  }
  @media (min-width: 768px) {
    margin-right: 15px;
  }
`;
Name.displayName = 'Name';

export const Email = styled.input`
  box-sizing: border-box;
  display: block;
  min-width: 0;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 30px;
  background-color: #999;
  border: 1px solid black;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s;
  color: black;
  :invalid {
    box-shadow: none;
  }
  :focus {
    border-color: green;
  }
  @media (min-width: 768px) {
    margin-left: 15px;
  }
`;
Email.displayName = 'Email';

export const Subject = styled.input`
  box-sizing: border-box;
  display: block;
  min-width: 0;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 30px;
  background-color: #999;
  border: 1px solid black;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.3s;
  color: black;
  :invalid {
    box-shadow: none;
  }
  :focus {
    border-color: green;
  }
  @media (min-width: 768px) {
    margin-left: 15px;
  }
`;
Subject.displayName = 'Subject';

export const Message = styled.textarea`
  font-size: 16px;
  letter-spacing: 1px;
  outline: none;
  background-color: #999;
  border: 1px solid black;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  padding: 15px 20px;
  margin-bottom: 30px;
  transition: border-color 0.3s;
  color: black;
  :invalid {
    box-shadow: none;
  }
  :focus {
    border-color: green;
  }
`;
Message.displayName = 'Message';
