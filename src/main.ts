import {IRequest, IResponse} from "../index";
import {Response} from './server'


export default function handlerGen<Req, Res>(getter: (req: Req) => Res, mutate: (req: Req) => void) {
    return function handler(req: IRequest<Req>): IResponse<Res> {
        mutate(req.get());

        const found = getter(req.get());

        return new Response(found);
    }
}