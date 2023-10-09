import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSchedules } from "../contexts/SchedulesContext";
import Button from "react-bootstrap/Button";
import Modal from "../components/Modal";
import {
  Col,
  Container,
  Modal as ModalDefault,
  Row,
  Table,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "@phosphor-icons/react";
import { schema } from "../validations/schemaDoctors";

const Doctors = () => {
  const [show, setShow] = useState(false);

  const { doctors, setDoctors } = useSchedules();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const handleSave = (newDoctor) => {
    setDoctors((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        doctorName: newDoctor.doctorName,
        register: newDoctor.register,
        area: newDoctor.area,
      },
    ]);
    setShow(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    handleSave(data);
    reset();
  };

  return (
    <Container className="mt-4 animeLeft">
      <h1 className="mb-5">Médicos</h1>
      <Button className="mb-3" variant="dark" onClick={handleShow}>
        Cadastrar <Plus size={20} weight="bold" />
      </Button>
      <Modal
        title="Agendamento"
        buttonName="Agendar"
        handleShow={handleShow}
        setShow={setShow}
        handleSave={handleSave}
        handleClose={handleClose}
        show={show}
      >
        <ModalDefault.Body>
          <Container fluid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="doctorName">
                      Nome do Médico
                    </label>
                    <input
                      className="w-100 form-control"
                      id="doctorName"
                      type="text"
                      {...register("doctorName")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.doctorName?.message}
                  </p>
                </Col>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="register">
                      Registro - CRM
                    </label>
                    <input
                      className="w-100 form-control"
                      id="register"
                      type="number"
                      placeholder="8 números"
                      {...register("register")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.register?.message}
                  </p>
                </Col>
              </Row>
              <Row>
                <div>
                  <label className="form-label" htmlFor="area">
                    Área de atuação
                  </label>
                  <textarea
                    id="area"
                    className="form-control"
                    {...register("area")}
                  ></textarea>
                </div>
              </Row>

              <ModalDefault.Footer className="modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                  Fechar
                </Button>

                <Button type="submit" variant="dark">
                  Cadastrar
                </Button>
              </ModalDefault.Footer>
            </form>
          </Container>
        </ModalDefault.Body>
      </Modal>
      <Row>
        <Col className="box" lg={8}>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Nome do médico</th>
                <th>Registro</th>
                <th>Área</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length &&
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.doctorName}</td>
                    <td>{doctor.register}</td>
                    <td>{doctor.area}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Doctors;
