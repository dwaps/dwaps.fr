import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../utils/context/AuthContext";
import { FormContext } from "../utils/context/FormContext";
import { ModalContext } from "../utils/context/ModalContext";
import { userSchemaLogin, userSchemaSignup } from "../utils/form";

function FormModal() {
  const { showModal, setShowModal } = useContext(ModalContext);
  // TODO: Loading
  // const { signup, login, loading } = useContext(AuthContext);
  const { signup, login } = useContext(AuthContext);
  const { isSignupForm, setIsSignupForm } = useContext(FormContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isSignupForm ? userSchemaSignup : userSchemaLogin),
  });

  const onSumbit = async (data) => {
    const { email, password } = data;

    try {
      if (isSignupForm) {
        await signup(email, password);
        setIsSignupForm(false);
      } else {
        await login(email, password);
        setShowModal(false);
      }
      reset();
    } catch (e) {
      console.error("L'utilisateur n'a pas pu être créé.");

      setShowModal(true);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>{isSignupForm ? "S'inscrire" : "Se connecter"}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            onSubmit={handleSubmit(onSumbit, (errors) => console.log(errors))}
            className="text-center"
          >
            <Form.FloatingLabel className="mb-3" label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              <Form.Text className="text-danger">
                {errors?.email?.message}
              </Form.Text>
            </Form.FloatingLabel>
            <Form.FloatingLabel className="mb-3" label="Mot de passe">
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                {...register("password")}
              />
              <Form.Text className="text-danger">
                {errors?.password?.message}
              </Form.Text>
            </Form.FloatingLabel>
            {isSignupForm && (
              <Form.FloatingLabel className="mb-3" label="Confirmation">
                <Form.Control
                  type="password"
                  placeholder="Confirmation"
                  {...register("confirm")}
                />
                <Form.Text className="text-danger">
                  {errors?.confirm?.message}
                </Form.Text>
              </Form.FloatingLabel>
            )}
            <Button variant="primary" className="text-light" type="submit">
              {isSignupForm ? "S'inscrire" : "Se connecter"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
