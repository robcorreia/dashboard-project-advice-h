import * as yup from "yup";

export const schema = yup
  .object({
    consultDay: yup.string().required("A da consulta é obrigatório."),
    consultationTime: yup
      .string("O valor deve ser um número de 8 até 20.")
      .required("O Horário da consulta é obrigatório."),
    duration: yup
      .string()
      .min(1, "Deve ter no mínimo 15 minutos.")
      .required("A duração é obrigatória."),
    patientName: yup.string().required("O nome do paciente é obrigatório."),
    registration: yup
      .string()
      .min(6, "O número da matrícula deve ter 6 digitos")
      .max(6, "O número da matrícula deve ter 6 digitos")
      .required("A matrícula do paciente é obrigatório."),
    healthInsurance: yup.bool().default(false),
    consultValue: yup.string(),
    description: yup.string().required("Digite informações sobre a consulta."),
    doctor: yup.string().required("O nome do médico é obrigatório."),
  })
  .required();
