import { atom } from 'recoil';
import { Customer, Mechanic, Service, User, Vehicle } from '../../lib/types';


export const customerState = atom<Customer | null>({
  key: 'customerState',
  default: null,
});


export const servicesState = atom<Service[]>({
  key: 'servicesState',
  default: [],
});


export const vehiclesState = atom<Vehicle[]>({
  key: 'vehiclesState',
  default: [],
});

export const adminMechanicsState = atom<User[]>({
  key: 'adminMechanicsState',
  default: [],
});

export const mechanicsState = atom<Mechanic | null>({
  key: 'mechanicsState',
  default: null,
})