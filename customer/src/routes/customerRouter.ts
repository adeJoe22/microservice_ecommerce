import { NextFunction, Request, Response, Router } from 'express';
import { ICustomerRepository } from '../entity';
import { CustomerDbRepository } from '../dto';
import { makeDB } from '../dto/mongoDB';
import { buildCustomerController } from '../controller';
import { Authenticate } from '../middlewares/auth';

const router = Router();

//Dependency Injection
const customerRepository: ICustomerRepository = new CustomerDbRepository(
  makeDB
);
const customerController = buildCustomerController(customerRepository);

router.post(
  '/customers/register',
  async (req: Request, res: Response, next: NextFunction) =>
    customerController.createRegisterCustomer(req, res)
);

router.post(
  '/customers/login',
  async (req: Request, res: Response, next: NextFunction) =>
    customerController.loginCustomer(req, res)
);

router.get(
  '/customers',
  async (req: Request, res: Response, next: NextFunction) =>
    customerController.fetchCustomers(req, res)
);

router.use(Authenticate);
router.get(
  '/customers/:customerID',
  async (req: Request, res: Response, next: NextFunction) =>
    customerController.fetchCustomer(req, res)
);

router.post(
  '/customers/address/',
  async (req: Request, res: Response, next: NextFunction) =>
    customerController.createAddress(req, res)
);

export { router as customerRouter };
