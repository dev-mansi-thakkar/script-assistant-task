import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Header, Group, Button } from "@mantine/core";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Add actual authentication logic here
    logout();
    navigate("/");
  };
  return (
    // <Container>
    //   <Header height={60} p="xs" style={{ display: 'flex', justifyContent: 'space-between' }}>
    //     <Group>
    //       <Link to="/resources">Home</Link>
    //     </Group>
    //     <Button onClick={handleLogout}>Logout</Button>
    //   </Header>
    // </Container>
    <div className="w-full">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center mx-auto">
        <nav className="flex items-center">
          <Link to="/resources" className="text-lg ml-6 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <path fill="#E8EAF6" d="M42 39L6 39 6 23 24 6 42 23z"></path>
              <path
                fill="#C5CAE9"
                d="M39 21L34 16 34 9 39 9zM6 39H42V44H6z"
              ></path>
              <path
                fill="#B71C1C"
                d="M24 4.3L4 22.9 6 25.1 24 8.4 42 25.1 44 22.9z"
              ></path>
              <path fill="#D84315" d="M18 28H30V44H18z"></path>
              <path fill="#01579B" d="M21 17H27V23H21z"></path>
              <path
                fill="#FF8A65"
                d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"
              ></path>
            </svg>
          </Link>
        </nav>
        <button
          className="bg-red-500 px-4 py-2 mr-6 rounded md:block"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
    </div>
  );
};

export default Navbar;
