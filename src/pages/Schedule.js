import Calendar from "../components/Calendar";
import Container from "react-bootstrap/Container";
const Schedule = () => {
  return (
    <Container className="mt-4 animeLeft">
      <h1 className="mb-5">Agendamentos</h1>
      <div className="box">
        <Calendar />
      </div>
    </Container>
  );
};

export default Schedule;
