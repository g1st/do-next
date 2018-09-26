import NavBar from './NavBar';

const Layout = props => {
  return (
    <React.Fragment>
      <NavBar />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
