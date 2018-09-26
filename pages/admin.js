import ShoppingIcon from '@material-ui/icons/ShoppingBasket';

import styled from 'styled-components';

const BigFont = styled.p`
  font-size: 40px;
  color: grey;
`;

const Todo = styled.ol`
  background: lightblue;
`;

const Item = styled.li`
  font-size: 38px;
`;

const Admin = () => {
  return (
    <div>
      <p>This is Admin page.</p>
      <ShoppingIcon />
      <BigFont>Veikia?</BigFont>
      <Todo>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
        <Item>Four</Item>
        <Item>Four</Item>
        <Item>Four</Item>
        <Item>Four</Item>
      </Todo>
    </div>
  );
};

export default Admin;
