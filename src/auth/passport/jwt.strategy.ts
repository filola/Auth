<<<<<<< HEAD
=======
/*
  ==============================================================================
    (c) 2022. quantum universe All rights reserved.
    author : JOOYOUNG KIM
    start date : 11/08/2022
  ==============================================================================
*/
>>>>>>> main
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        console.log(payload);
        return payload;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> main
