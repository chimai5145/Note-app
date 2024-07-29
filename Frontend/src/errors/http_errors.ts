class HttpErrors extends Error{
    constructor(messege?: string){
        super(messege);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 401
 */

export class UnauthorizedError extends HttpErrors{

}

/**
 * Status code: 409
 */

export class ConflictError extends HttpErrors{

}