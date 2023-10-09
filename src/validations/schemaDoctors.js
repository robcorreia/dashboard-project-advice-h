import * as yup from "yup";

export const schema = yup
  .object({
    doctorName: yup.string().required("O nome é obrigatório."),
    register: yup
      .string("O registro deve ser um número de 8 números.")
      .required("O registro é obrigatório."),
    area: yup.string().required("A área de atuação é obrigatória."),
  })
  .required();
