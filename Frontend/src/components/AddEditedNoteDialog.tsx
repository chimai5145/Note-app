import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import style from "../styles/AddNoteDialog.module.css";
import * as NoteApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddEditedNoteDialogProps {
    noteToEdit?: Note,
    onDimiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const AddEditedNoteDialog = ({ noteToEdit, onDimiss: onDismiss, onNoteSaved }: AddEditedNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NoteApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NoteApi.createNote(input);
            }
            onNoteSaved(noteResponse);

        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title className={style.dialog}>
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditedNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.title}
                    />
                    <TextInputField
                        name="text"
                        label="Text"
                        type="text"
                        rows={5}
                        as="textarea"
                        placeholder="Text"
                        register={register}
                    />
                    {/* <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback>
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group> */}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className={style.button}
                    type="submit"
                    form="addEditedNoteForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditedNoteDialog;