import {IRequest, IResponse, Predicate, Action, UnaryFunction} from "../index";
import {Request, Response} from './server'


// Actions are associative.
export default function handlerGen<Req, Res>(requestMappings: Array<[Predicate<Req>, Action<Req>]>,
                                             responseMappings: Array<[Predicate<Res>, Action<Res>]>,
                                             get: UnaryFunction<Req, Res>) {
    return function handler(wrappedReq: IRequest<Req>): IResponse<Res> {
        const req = wrappedReq.get();

        const filteredRequestMappings = requestMappings.filter(([predicate]) => predicate(req));
        const mappedReq = filteredRequestMappings.reduce((prev, [, acc]) => acc(prev), req);

        const res = get(mappedReq);

        const filteredResponseMappings = responseMappings.filter(([predicate]) => predicate(res));
        const mappedRes = filteredResponseMappings.reduce((prev, [, acc]) => acc(prev), res);

        return new Response(mappedRes);
    }
}

export function exampleUsage() {
    const handler = handlerGen<string, string>([
            [
                (arg: string) => true,
                (arg: string) => `Hello from Request '${arg}'`
            ],
        ],
[
            [
                (arg: string) => true,
                (arg: string) => `Hello from Response '${arg}'`
            ],

        ],
    (arg: string) => `Hello '${arg}' from Getter`
    );

    const wrapped: IResponse<string> = handler(new Request('Jiho Lee'));
    const value: string = wrapped.get();

    console.log({value});
}

exampleUsage();