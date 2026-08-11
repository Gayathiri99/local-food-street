function Navbar() {
  return (
    <nav
      style={{
        width: "100%",
        height: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 60px",
        background: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#ff6b00",
        }}
      >
        🍴 Local Food Street
      </div>

      <ul
        style={{
          display: "flex",
          gap: "35px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li>Home</li>
        <li>Food</li>
        <li>Categories</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;