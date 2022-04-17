import {IRequest, IResponse, IAPIMapping, IAPIRoute, UnaryFunction} from '../index';

export class Request<T> implements IRequest<T> {
    body: T;

    constructor(body: T) {
        this.body = body;
    }

    get() {
        return this.body;
    }
}

export class Response<T> implements IResponse<T> {
    body: T;

    constructor(body: T) {
        this.body = body;
    }

    get() {
        return this.body;
    }
}

export class APIMapping<Req, Res> implements IAPIMapping<Req, Res> {
    handle: UnaryFunction<Req, Res>

    constructor(handler: UnaryFunction<Req, Res>) {
        this.handle = handler;
    }
}

// TODO: Implement APIRoute Binder
export class APIRoute<GetReq,
                        GetRes,
                        PostReq,
                        PostRes,
                        PutReq,
                        PutRes,
                        DeleteReq,
                        DeleteRes>
    implements IAPIRoute<GetReq,
                            GetRes,
                            PostReq,
                            PostRes,
                            PutReq,
                            PutRes,
                            DeleteReq,
                            DeleteRes> {

    url: string;
    get: APIMapping<GetReq, GetRes> | null;
    post: APIMapping<GetReq, GetRes> | null;
    put: APIMapping<GetReq, GetRes> | null;
    del: APIMapping<DeleteReq, DeleteRes> | null;

    constructor(url: string,
                get: APIMapping<GetReq, GetRes> | null,
                post: APIMapping<GetReq, GetRes> | null,
                put: APIMapping<GetReq, GetRes> | null,
                del: APIMapping<DeleteReq, DeleteRes> | null) {
        this.url = url;

        this.get = get;
        this.post = post;
        this.put = put;
        this.del = del;
    }
}
