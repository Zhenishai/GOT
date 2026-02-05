import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  const navbarRef = useRef(null);
  const hoverZoneRef = useRef(null);

  const isHovering = useRef(false);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const navbar = navbarRef.current;

    const showNavbar = () => {
      navbar.classList.add("visible");
      navbar.classList.remove("hidden");

      clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => {
        if (!isHovering.current) {
          navbar.classList.add("hidden");
          navbar.classList.remove("visible");
        }
      }, 1200);
    };

    const onScroll = () => {
      showNavbar();
    };

    const onHoverEnter = () => {
      isHovering.current = true;
      navbar.classList.add("visible");
      navbar.classList.remove("hidden");
      clearTimeout(hideTimeout.current);
    };

    const onHoverLeave = () => {
      isHovering.current = false;
      hideTimeout.current = setTimeout(() => {
        navbar.classList.add("hidden");
        navbar.classList.remove("visible");
      }, 600);
    };

    window.addEventListener("scroll", onScroll);
    hoverZoneRef.current.addEventListener("mouseenter", onHoverEnter);
    hoverZoneRef.current.addEventListener("mouseleave", onHoverLeave);
    navbar.addEventListener("mouseenter", onHoverEnter);
    navbar.addEventListener("mouseleave", onHoverLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Invisible hover zone */}
      <div ref={hoverZoneRef} className="navbar-hover-zone" />

      <nav ref={navbarRef} className="navbar hidden">
        <div className="navbar-left">
          <NavLink to="/" className="logo">
            GoT
          </NavLink>
        </div>

        <div className="navbar-right">
          <NavLink to="/" end className="ui-button">
            Home
          </NavLink>
          <NavLink to="/episodes" className="ui-button">
            Episodes
          </NavLink>
          <NavLink to="/quiz" className="ui-button">
            Quiz
          </NavLink>
          <NavLink to="/login" className="ui-button">
            Login
          </NavLink>
        </div>
      </nav>
    </>
  );
}
