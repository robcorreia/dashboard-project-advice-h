import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Calendar as MyCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useSchedules } from "../contexts/SchedulesContext";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
const localizer = momentLocalizer(moment);

const Summary = () => {
  const { dataSchedules } = useSchedules();

  function totalConsultValue() {
    // {data.filter((item) => item.status !== 'falha').reduce((acc, item) => acc + item.preco, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    return dataSchedules
      .reduce(
        (acc, item) => acc + Number(item.consultValue.replace(",", ".")),
        0
      )
      .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  const sumPerDoctor = {};

  for (const consulta of dataSchedules) {
    const doctorName = consulta.doctor;

    if (!sumPerDoctor[doctorName]) {
      sumPerDoctor[doctorName] = 1;
    } else {
      sumPerDoctor[doctorName]++;
    }
  }

  const totalSchedulePerDoctor = Object.entries(sumPerDoctor).map(
    ([name, totalSchedule]) => ({
      name,
      totalSchedule,
    })
  );

  const sumValueTotalPerDoctor = {};

  for (const consulta of dataSchedules) {
    const doctorName = consulta.doctor;
    const valorConsulta = parseFloat(consulta.consultValue.replace(",", "."));

    if (!sumValueTotalPerDoctor[doctorName]) {
      sumValueTotalPerDoctor[doctorName] = valorConsulta;
    } else {
      sumValueTotalPerDoctor[doctorName] += valorConsulta;
    }
  }

  const totalPerDoctor = Object.entries(sumValueTotalPerDoctor).map(
    ([name, totalValue]) => ({
      name,
      totalValue,
    })
  );

  return (
    <Container className="mt-4 animeLeft">
      <h1 className="mb-5">Resumo Mensal</h1>

      <Row className="box">
        <Col lg={6}>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Tipo da consulta</th>
                <th>Nome do paciente</th>
                <th>Data da consulta</th>
              </tr>
            </thead>
            <tbody>
              {dataSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.title}</td>
                  <td>{schedule.patientName}</td>
                  <td>
                    {moment(`${schedule.start}`).format(
                      "MMMM Do YYYY, h:mm:ss"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col lg={6}>
          <MyCalendar
            localizer={localizer}
            events={dataSchedules}
            defaultView="month"
            selectable
            popup
            style={{ height: 500 }}
          />
        </Col>
      </Row>
      <Row className="mt-4 mb-2">
        <Col className="box" lg={4}>
          <p>
            Total de atendimentos no mês:{" "}
            <strong>{dataSchedules.length}</strong>
          </p>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="box" lg={4}>
          <p>
            Total de valor feito no mês: <strong>{totalConsultValue()}</strong>
          </p>
        </Col>
      </Row>
      <Row className="mb-2 box">
        <Col lg={6}>
          <p>Total de atendimentos feitos por Médico no mês:</p>
          <ListGroup>
            {totalSchedulePerDoctor &&
              totalSchedulePerDoctor.map((doctor) => (
                <ListGroup.Item key={doctor.name}>
                  <p>
                    O médico {doctor.name} fez o valor total de:{" "}
                    <strong>{doctor.totalSchedule}</strong>
                  </p>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col lg={6}>
          <p>Total de valor feito por Médico no mês:</p>
          <ListGroup>
            {totalPerDoctor &&
              totalPerDoctor.map((doctor) => (
                <ListGroup.Item key={doctor.name}>
                  <p>
                    O médico {doctor.name} fez o valor total de:{" "}
                    <strong>
                      {doctor.totalValue.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </p>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
