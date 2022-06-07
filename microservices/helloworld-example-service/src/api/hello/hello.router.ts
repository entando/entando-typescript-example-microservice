/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router, Request, Response, NextFunction } from 'express';
import { keycloak } from '../../middleware/keycloak';
import { validate } from '../../middleware/validator';

import {
  CreateHelloRequest,
  UpdateHelloRequest
} from './request';

export const router: Router = Router();

router.post('/hello',
  keycloak.protect(),
  validate(CreateHelloRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = { hello: req.body.message };
    res.status(201).send({
      payload: result,
    });
  }
);

router.get('/hello/:message',
  keycloak.protect(),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = { hello: req.params.message };
    
    res.status(200).send({
      payload: result,
    });
  }
);

router.delete('/hello/:message',
  keycloak.protect(),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = { hello: req.params.message };
    res.status(200).send({
      payload: result,
    });
  }
);

router.put('/hello/:message',
  keycloak.protect(),
  validate(UpdateHelloRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    const result = { hello: req.body.message };
    res.status(200).send({
      payload: result,
    });
  }
);
