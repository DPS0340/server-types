export interface IHolder<T> {
    get(): T;
}

export interface IRequest<T> extends IHolder<T> { }
export interface IResponse<T> extends IHolder<T> { }

export type UnaryFunction<Input, Output> = (arg: Input) => Output

export interface IHandler<Input, Output> {
    // Same as UnaryFunction<Input, Output>, but much understandable signature
    handle(arg: Input): Output;
}

export interface IAPIMapping<Req, Res> extends IHandler<(req: Request<Req>) => Response<Res>> { }

export interface IAPIRoute<GetReq,
                            GetRes,
                            PostReq,
                            PostRes,
                            PutReq,
                            PutRes,
                            DeleteReq,
                            DeleteRes> {

    url: string;

    get: APIMapping<GetReq, GetRes> | null;
    post: APIMapping<PostReq, PostRes> | null;
    put: APIMapping<PutReq, PostRes> | null;
    del: APIMapping<DeleteReq, DeleteRes> | null;
}
