import AppResponseType from 'types/appResponseType';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import JwtPayloadType from '../types/jwtPayloadType';

type method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ConfigType {
  methods: method[];
  privateMethods?: method[];
  controller: (req: Request, res: Response) => void;
}

// 올바른 method인지 확인하고, try,catch 같은 진부한 코드를 처리한다.
function withController({ methods, privateMethods, controller }: ConfigType) {
  return async function (req: Request, res: Response<AppResponseType>): Promise<any> {
    // 잘못된 타입의 요청이 들어오면 종료
    // if (req.method && !methods.includes(req.method as any)) {
    if (!methods.includes(req.method as any)) {
      return res.status(405).json({ isSuccess: false, message: '잘못된 요청 메소드', result: {} });
    }

    if (privateMethods?.includes(req.method as any)) {
      const { jwt } = req.headers;
      if (!jwt) {
        return res
          .status(401)
          .json({ isSuccess: false, message: '요청에 jwt 토큰이 포함되지 않았습니다.', result: {} });
      }
      try {
        // jwt 인증
        // 유효하지 않거나 만료된 토큰이면 에러 발생

        const decode = verify(jwt as string, process.env.JWT_PRIVATE_KEY as string);

        const { userId } = decode as JwtPayloadType;
        req.headers.userId = userId;
      } catch {
        console.log('catch');
        return res.status(401).json({
          isSuccess: false,
          message: '유효하지 않거나 만료된 jwt 토큰입니다',
          result: {},
        });
      }
    }

    try {
      await controller(req, res);
    } catch (error) {
      return res.status(500).json({ isSuccess: false, message: String(error), result: {} });
    }
  };
}

export default withController;
