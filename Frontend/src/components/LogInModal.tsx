import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";
import { SignUpCredentials } from "../network/notes_api";
import style from "../styles/AddNoteDialog.module.css";
import TextInputField from "./form/TextInputField";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

interface LogInModalProps {
    onDismiss: () => void
    onLogInSuccessful: (user: User) => void,
}

const LogInModal = ({ onDismiss, onLogInSuccessful: onLogInSuccessful }: LogInModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const user = await NotesApi.logIn(credentials);
            onLogInSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error);
            }
            console.error(error);

        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className={style.dialog}>
                    log in
                </Modal.Title>
            </Modal.Header>


            <Modal.Body >
                {errorText &&
                    <Alert variant="danger">
                        (errorText)
                    </Alert>
                }
                <Form id="SignUpForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    {/* 
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    /> */}

                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={style.button}
                    type="submit"
                    form="SignUpForm"
                    disabled={isSubmitting}
                >
                    Log In
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LogInModal;