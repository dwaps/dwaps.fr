import { object, ref, string } from "yup";

const email = string()
  .required("Ce champ est obligatoire")
  .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email invalide");

const password = string()
  .required("Ce champ est obligatoire")
  .min(8, "Doit contenir au moins 8 caractères")
  .matches(/^(?=.{8,})/, "Doit contenir au moins 8 caractères")
  .matches(/^(?=.*[!@#\$%\^&\*])/, "Il faut au moins 1 caractère spécial")
  .matches(/^(?=.*[0-9])/, "Il faut au moins un nombre")
  .matches(/^(?=.*[a-z])/, "Il faut au moins une minuscule")
  .matches(/^(?=.*[A-Z])/, "Il faut au moins une majuscule");

const confirm = string()
  .required("Ce champ est obligatoire")
  .oneOf([ref("password")], "Ne correspond pas !");

export const userSchemaSignup = object({
  email,
  password,
  confirm,
});

export const userSchemaLogin = object({
  email,
  password,
  confirm: string(),
});
