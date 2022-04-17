import {IRequest, IResponse} from "../index";
import {Response} from './server'


export default function handlerGen<Req, Res>(getter: (req: Req) => Res, mutate: (req: IRequest<Req>) => void) {
    return function handler(req: IRequest<Req>): IResponse<Res> {
        mutate(req);

        const found = getter(req);

        return new Response(found);
    }
}