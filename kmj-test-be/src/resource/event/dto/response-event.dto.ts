export default class EventReponseDto
{
    data?: any
    error?: {
        code: number
        description: string
    }
}

export const ERROR_CODE = 400