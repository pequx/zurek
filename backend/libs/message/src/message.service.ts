import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
    public readonly message = {
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
        }
    }

    public getRuntimeError = (e:any) => ({
        description: {
            en: "Runtime error",
            pl: "",
            de: ""
        },
        error: JSON.stringify(e)
    })
}
