import React, { useState } from "react";
import { Calendar as MyCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useSchedules } from "../../contexts/SchedulesContext";
import Button from "react-bootstrap/Button";
import Modal from "../Modal/index";
import {
  Col,
  Container,
  Form,
  Modal as ModalDefault,
  Row,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "@phosphor-icons/react";
import { schema } from "../../validations/schemaSchedule";
const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [show, setShow] = useState(false);

  const { dataSchedules, setDataSchedules, doctors } = useSchedules();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const handleSave = (newSchedule) => {
    setShow(false);
    setDataSchedules([
      ...dataSchedules,
      {
        id: uuidv4(),
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
        doctor: newSchedule.doctor,
      },
    ]);
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
    <div>
      <Button className="mb-3" variant="dark" onClick={handleShow}>
        Agendar <Plus size={20} weight="bold" />
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
                    <label className="form-label" htmlFor="consultDay">
                      Data da consulta
                    </label>
                    <input
                      className="w-100 form-control"
                      id="consultDay"
                      type="date"
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
                      type="string"
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
                      {...register("registration")}
                    />
                  </div>
                  <p className="text-danger error-message">
                    {errors.registration?.message}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <label className="form-label" htmlFor="doctor">
                      Médico
                    </label>
                    <Form.Select
                      id="doctor"
                      aria-label="Selecione o médico"
                      {...register("doctor")}
                    >
                      <option>Selecione o médico</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.doctorName}>
                          {doctor.doctorName}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <p className="text-danger error-message">
                    {errors.doctor?.message}
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
                  Agendar
                </Button>
              </ModalDefault.Footer>
            </form>
          </Container>
        </ModalDefault.Body>
      </Modal>
      <MyCalendar
        localizer={localizer}
        events={dataSchedules}
        defaultView="week"
        selectable
        popup
        style={{ height: 600 }}
      />
    </div>
  );
};

export default Calendar;
