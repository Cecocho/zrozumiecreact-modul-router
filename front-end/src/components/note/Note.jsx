import RemoveIcon from "../../assets/remove.svg";
import styles from "./Note.module.css";
import { TopBar } from "../top-bar/TopBar";
import { useLoaderData, Form, useSubmit } from "react-router-dom";

const NoteEditor = ({ children }) => (
    <div className={styles["note-editor"]}>{children}</div>
);

export async function updateNote({ request, params }) {
    const data = await request.formData();

    const title = data.get("title");
    const body = data.get("body");

    return fetch(`http://localhost:3000/notes/${params.noteId}`, {
        method: "PATCH",
        body: JSON.stringify({
            title,
            body,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

const Note = () => {
    const note = useLoaderData();
    const submit = useSubmit();

    return (
        <div className={styles.container}>
            <TopBar>
                <button className={styles.button}>
                    <img className={styles.image} src={RemoveIcon} />
                </button>
            </TopBar>
            <Form
                method="PATCH"
                onChange={(event) => {
                    submit(event.currentTarget);
                }}
            >
                <NoteEditor>
                    <input type="text" defaultValue={note.title} name="title" />
                    <textarea defaultValue={note.body} name="body" />
                </NoteEditor>
            </Form>
        </div>
    );
};

export { Note };
