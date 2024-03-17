import { Request, Response } from 'express';
import { Address, Customer, ICustomerRepository } from '../entity';
import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from '../utils';
import {
  buildAddAddress,
  buildCustomerProfile,
  buildGetCustomer,
  buildGetCustomers,
  buildRegisterCustomer,
} from '../usecases/customerUseCase';
import { makeDB } from '../dto';
import { ObjectId } from 'mongodb';

export function buildCustomerController(
  customerRepository: ICustomerRepository
) {
  const registerUser = buildRegisterCustomer(customerRepository);
  const getUsers = buildGetCustomers(customerRepository);
  const getUser = buildGetCustomer(customerRepository);
  const userProfile = buildCustomerProfile(customerRepository);
  const addAddress = buildAddAddress(customerRepository);

  return Object.freeze({
    createRegisterCustomer: async (req: Request, res: Response) => {
      const user = <Customer>req.body;

      const checkExist = await userProfile(user.email);
      if (checkExist !== null) {
        return res.status(400).json({ message: 'User already exist' });
      }
      const salt = await GenerateSalt();
      const genPass = await GeneratePassword(user.password, salt);

      try {
        const newUser = {
          email: user.email,
          salt,
          password: genPass,
          phone: user.phone,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          cart: user.cart || [],
          wishList: user.wishList || [],
          orders: user.orders || [],
          // address: user.address || [],
        };

        await registerUser(newUser);
        res.status(201).json({ message: 'User registered' });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    },

    fetchCustomers: async (req: Request, res: Response) => {
      try {
        const users = await getUsers();
        const result = users.map((user) => {
          const newUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          };
          return newUser;
        });
        return res.status(200).json(result);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    },

    fetchCustomer: async (req: Request, res: Response) => {
      try {
        const customerID = req.params.customerID;
        const user = await populateAddress(customerID);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        return res.status(200).json(user);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    },

    loginCustomer: async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;
        const profile = await userProfile(email);

        if (!profile) {
          throw new Error('User not found');
        }
        const isPasswordValid = await ValidatePassword(
          password,
          profile.password,
          profile.salt
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const token = GenerateSignature({
          email: profile.email,
          _id: profile!._id!,
          phone: profile.phone,
        });

        return res.status(200).json(token);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    },

    createAddress: async (req: Request, res: Response) => {
      const { _id } = req.user!;

      const { street, country, postalCode, city } = <Address>req.body;

      try {
        const profile = await getUser(_id);
        if (!profile) {
          throw new Error('User not found');
        }

        const setAddress = {
          id: new ObjectId(_id),
          street,
          country,
          postalCode,
          city,
        };

        const newAddress = await addAddress(setAddress);

        // Update the customer's address field in the database

        // if (!profile.address) {
        //   profile.address = []; // Initialize the address array if not exists
        // }

        // profile.address.push(newAddress);

        // Update the customer's address field in the database
        // await customerRepository.UpdateCustomerById(_id, profile);
        return res.status(201).json(newAddress);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    },
  });
}

async function populateAddress(customerID: string) {
  const pipeline = [
    { $match: { _id: new ObjectId(customerID) } }, // Match the customer by ID
    {
      $lookup: {
        from: 'address',
        localField: '_id',
        foreignField: 'id',
        as: 'addresses',
      },
    },
    {
      $addFields: {
        address: '$addresses',
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        email: 1,
        phone: 1,
        firstName: 1,
        lastName: 1,
        cart: 1,
        wishList: 1,
        orders: 1,
        address: {
          $map: {
            input: '$address',
            as: 'addr',
            in: {
              street: '$$addr.street',
              country: '$$addr.country',
              postalCode: '$$addr.postalCode',
              city: '$$addr.city',
            },
          },
        },
      },
    },
  ];

  const db = await makeDB();

  // Log the pipeline stages
  // console.log('Aggregation Pipeline Stages:');
  // pipeline.forEach((stage, index) => {
  //   console.log(`Stage ${index + 1}: ${JSON.stringify(stage)}`);
  // });

  // Perform the aggregation
  const customer = await db
    ?.collection('customers')
    .aggregate(pipeline)
    .toArray()!;

  return customer[0];
}
