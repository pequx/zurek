import {  Message, Messages } from "./message.interface";

export const messages = {
    ENTITY_NOT_FOUND: {
        description: {
            en: "Entity not found",
            pl: "",
            de: ""
        }
    },
    REPOSITORY_SAVE_ERROR: {
        description: {
            en: "Repository save error",
            pl: "",
            de: ""
        }
    },
    REPOSITORY_FIND_ERROR: {
        description: {
            en: "Respository find error",
            pl: "",
            de: ""
        }
    },
    RESPOSITORY_UPDATE_ERROR: {
        description: {
            en: "Respository update error",
            pl: "",
            de: ""
        }
    },
    RESPOSITORY_DELETE_ERROR: {
        description: {
            en: "Respository delete error",
            pl: "",
            de: ""
        }
    },
    RUNTIME_ERROR: (e:any) => ({
        description: {
            en: "Runtime error",
            pl: "",
            de: ""
        },
        error: e
    })
}