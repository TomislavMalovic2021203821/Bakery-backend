
import { Response } from "express";

export async function handleRequest(res: Response, callback: Promise<any>,) {
    try {
        const data = await callback
        if (data == undefined) {
            res.status(204).send()
            return

        }
        res.json(data)
    } catch (e) {
        let code = 500
        if (e.message == "NOT_FOUND")
            code = 404

        res.status(code).json({ //ako je not found vrati 404 a u suprotnom vrati 500
            message: e.message,
            timesamp: new Date()
        })
    }
}

export function checkIfDefined(data : any){
    if(data == undefined)
        throw new Error("NOT_FOUND")
    return data
}

