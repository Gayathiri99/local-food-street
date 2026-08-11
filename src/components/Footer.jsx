function Footer() {
  return (
    <footer
      style={{
        background: "#222",
        color: "white",
        padding: "50px 60px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: "300px" }}>
          <h2
            style={{
              color: "#ff6b00",
              fontSize: "26px",
            }}
          >
            🍴 Local Food Street
          </h2>

          <p
            style={{
              color: "#eeeeee",
              lineHeight: 1.7,
            }}
          >
            Discover delicious local foods and traditional flavours from your
            favourite places.
          </p>
        </div>

        <div>
          <h3
            style={{
              color: "#ff9800",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Quick Links
          </h3>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>Home</li>
            <li>Food</li>
            <li>Categories</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3
            style={{
              color: "#ff9800",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            Contact
          </h3>

          <p>📧 localfood@gmail.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 India</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          paddingTop: "20px",
          textAlign: "center",
          borderTop: "1px solid #555",
        }}
      >
        <p
          style={{
            color: "#bbbbbb",
            fontSize: "14px",
          }}
        >
          © 2026 Local Food Street | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;