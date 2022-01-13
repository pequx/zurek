import { Description } from "./description.interface";

export interface Message {
    description: Description
    error?: any
}

export interface Messages {
    code: Message
}