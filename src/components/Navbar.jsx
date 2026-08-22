function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">THE KAUNYANGI FOUNDATION</h2>

   <ul className="nav-links">

  <li
    onClick={() =>
      document.getElementById("home").scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Home
  </li>

  <li
    onClick={() =>
      document.getElementById("about").scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    About
  </li>

  <li
    onClick={() =>
      document.getElementById("programs").scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Programs
  </li>

  <li
    onClick={() =>
      document.getElementById("contact").scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Contact
  </li>
  <li
  onClick={() =>
    document.getElementById("gallery").scrollIntoView({
      behavior: "smooth",
    })
  }
>
  Gallery
</li>

</ul>
    </nav>
  );
}

export default Navbar;