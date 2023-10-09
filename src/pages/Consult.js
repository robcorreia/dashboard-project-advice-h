import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useSchedules } from "../contexts/SchedulesContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import moment from "moment";
import {
  CheckCircle,
  PencilSimple,
  Trash,
  XCircle,
} from "@phosphor-icons/react";
import SearchBar from "../components/SearchSchedule";
import { useCallback, useEffect, useState } from "react";
import { Col, Modal as ModalDefault } from "react-bootstrap";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../validations/schemaSchedule";

const Consult = () => {
  const { dataSchedules, setDataSchedules } = useSchedules();
  const [dataFiltered, setDataFiltered] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({});

  function handleDeleteSchedule(id) {
    const filteredDataSchedules = dataSchedules.filter(
      (schedule) => schedule.id !== id
    );
    setDataSchedules(filteredDataSchedules);
  }
  const onFilter = (array) => {
    setDataFiltered(array);
  };

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    reset();
  };

  function handleEditSchedule(id) {
    handleShow();
    const current = dataSchedules.filter((schedule) => schedule.id === id);
    setCurrentSchedule(current[0]);
  }

  const handleSave = useCallback(
    (newSchedule) => {
      const edited = dataSchedules.map((schedule) =>
        schedule.id === currentSchedule.id
          ? {
              id: currentSchedule.id,
              title: `${newSchedule.patientName} - ${newSchedule.description}`,
              start: moment(
                `${newSchedule.consultDay} ${newSchedule.consultationTime}`,
                "YYYYMMDD hh"
              ).toDate(),
              end: moment(
                `${newSchedule.consultDay} ${newSchedule.consultationTime}`,
                "YYYYMMDD hh"
              )
                .add(newSchedule.duration, "minutes")
                .toDate(),
              consultValue: newSchedule.consultValue,
              patientName: newSchedule.patientName,
              description: newSchedule.description,
              registration: newSchedule.registration,
              healthInsurance: newSchedule.healthInsurance,
            }
          : schedule
      );
      setDataSchedules(edited);

      setShow(false);
    },
    [currentSchedule.id, dataSchedules, setDataSchedules]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    reset();
    handleSave(data);
  };

  return (
    <Container className="mt-4 animeLeft">
      <h1 className="mb-5">Consultar agendamentos</h1>
      <Row className="box mb-3">
        {dataSchedules && (
          <SearchBar array={dataSchedules} onFilter={onFilter} />
        )}
      </Row>
      <Row className="box">
        {dataSchedules.length && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tipo da consulta</th>
                <th>Nome do paciente</th>
                <th>Data da consulta</th>
                <th>Tem convênio?</th>
                <th>Valor</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {dataFiltered.length <= 0
                ? dataSchedules.map((schedule) => (
                    <tr key={schedule.id}>
                      <td>{schedule.title}</td>
                      <td>{schedule.patientName}</td>
                      <td>
                        {moment(`${schedule.start}`).format(
                          "MMMM Do YYYY, h:mm:ss"
                        )}
                      </td>
                      <td>
                        {schedule.healthInsurance ? (
                          <CheckCircle size={18} weight="bold" />
                        ) : (
                          <XCircle size={18} weight="bold" />
                        )}
                      </td>
                      <td>{schedule.consultValue}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="dark"
                          onClick={() => handleEditSchedule(schedule.id)}
                        >
                          <PencilSimple size={18} weight="bold" />
                        </Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                        >
                          <Trash size={18} weight="bold" />
                        </Button>
                      </td>
                    </tr>
                  ))
                : dataFiltered.map((schedule) => (
                    <tr key={schedule.id}>
                      <td>{schedule.title}</td>
                      <td>{schedule.patientName}</td>
                      <td>
                        {moment(`${schedule.start}`).format(
                          "MMMM Do YYYY, h:mm:ss"
                        )}
                      </td>
                      <td className="text-center">
                        {schedule.healthInsurance ? (
                          <CheckCircle
                            className="text-success"
                            size={18}
                            weight="bold"
                          />
                        ) : (
                          <XCircle
                            className="text-danger"
                            size={18}
                            weight="bold"
                          />
                        )}
                      </td>
                      <td>{schedule.consultValue}</td>
                      <td>
                        <Button
                          variant="dark"
                          size="sm"
                          onClick={() => handleEditSchedule(schedule.id)}
                        >
                          <PencilSimple size={18} weight="bold" />
                        </Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteSchedule(schedule.id)}
                        >
                          <Trash size={18} weight="bold" />
                        </Button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        )}
      </Row>

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
                    <label className="form-label" htmlFor="consultDay">
                      Data da consulta
                    </label>
                    <input
                      className="w-100 form-control"
                      id="consultDay"
                      type="date"
                      defaultValue={moment(`${currentSchedule.start}`).format(
                        "YYYY-MM-DD"
                      )}
                      {...register("consultDay")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.consultDay?.message}
                  </p>
                </Col>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="duration">
                      Duração em minutos
                    </label>
                    <input
                      className="w-100 form-control"
                      id="duration"
                      type="number"
                      placeholder="Duração"
                      defaultValue={currentSchedule.duration}
                      {...register("duration")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.duration?.message}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="consultationTime">
                      Horário da consulta (8 as 20)
                    </label>
                    <input
                      className="w-100 form-control"
                      id="consultationTime"
                      type="number"
                      defaultValue={moment(`${currentSchedule.start}`).format(
                        "hh"
                      )}
                      {...register("consultationTime")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.consultationTime?.message}
                  </p>
                </Col>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="consultValue">
                      Valor da consulta
                    </label>
                    <input
                      className="w-100 form-control"
                      id="consultValue"
                      type="text"
                      defaultValue={currentSchedule.consultValue}
                      {...register("consultValue")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.consultValue?.message}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="patientName">
                      Nome do paciente
                    </label>
                    <input
                      className="w-100 form-control"
                      id="patientName"
                      type="text"
                      placeholder="Nome do paciente"
                      defaultValue={currentSchedule.patientName}
                      {...register("patientName")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.patientName?.message}
                  </p>
                </Col>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="registration">
                      Matrícula
                    </label>
                    <input
                      className="w-100 form-control"
                      id="registration"
                      type="text"
                      defaultValue={currentSchedule.registration}
                      {...register("registration")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.registration?.message}
                  </p>
                </Col>
              </Row>
              <Row>
                <div className="healthInsurance">
                  <label className="form-label" htmlFor="healthInsurance">
                    O paciente tem convênio?
                    <input
                      className="checkbox m-1"
                      id="healthInsurance"
                      type="checkbox"
                      defaultChecked={currentSchedule.healthInsurance}
                      {...register("healthInsurance")}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <p className="text-danger error-message">
                  {errors.healthInsurance?.message}
                </p>
              </Row>

              <Row>
                <Col>
                  <label className="form-label" htmlFor="description">
                    Descrição da consulta
                  </label>
                  <textarea
                    className="w-100 form-control"
                    id="description"
                    type="text"
                    placeholder="Digite informações sobre a consulta."
                    defaultValue={currentSchedule.description}
                    {...register("description")}
                  ></textarea>
                  <p className="text-danger error-message">
                    {errors.description?.message}
                  </p>
                </Col>
              </Row>
              <ModalDefault.Footer className="modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                  Fechar
                </Button>

                <Button type="submit" variant="dark">
                  Salvar
                </Button>
              </ModalDefault.Footer>
            </form>
          </Container>
        </ModalDefault.Body>
      </Modal>
    </Container>
  );
};

export default Consult;
