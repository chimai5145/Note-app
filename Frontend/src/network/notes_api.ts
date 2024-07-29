import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json();
        const errorMessege = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessege);
        }
        else if (response.status === 409) {
            throw new ConflictError(errorMessege);
        } else {
            throw Error("Request failed with status: " + response.status + " messege: " + errorMessege);
        }
    }
}

export async function getLogInUser(): Promise<User> {
    const response = await fetchData("/users", { method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/users/signup",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LogInCredentials {
    username: string,
    password: string,
}

export async function logIn(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/users/login",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData("/users/logout", { method: "POST" })
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/notes", { method: "GET" });
    return response.json();
}

export interface NoteInput {
    title: string;
    text?: string
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/notes",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(note)
        })
    return response.json();
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData("/notes/" + noteId,
        {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(note)
        })
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/notes/" + noteId, { method: "DELETE" });
}