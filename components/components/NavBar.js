export default ({ navbar }) => (
  <div>
    <h1>
      Navbar for desktop: <span>{navbar.state.desktopNavBar.toString()}</span>
    </h1>
    <button onClick={() => navbar.change()}>change navbar size</button>
  </div>
);
