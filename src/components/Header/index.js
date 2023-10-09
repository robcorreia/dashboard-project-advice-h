import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { useUser } from "../../contexts/UserContext";

const Header = () => {
  const { dataUser: user } = useUser();
  return (
    <header>
      <Navbar className="bg-3 header">
        <Container>
          <Navbar.Brand href="#home">
            <Image src="./images/logo-advicehelth.png" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Image
                className="px-2 profileImage"
                src={
                  user.profileImage
                    ? user.profileImage
                    : "/images/user-circle-bold.svg"
                }
                roundedCircle
              />
              <span className="userName">{user.name}</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div></div>
    </header>
  );
};

export default Header;
