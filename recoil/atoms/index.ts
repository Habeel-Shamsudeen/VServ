import { atom } from 'recoil';
import { Customer, Mechanic, Service, Vehicle } from '../../lib/types';


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

export const adminMechanicsState = atom<Mechanic[]>({
  key: 'adminMechanicsState',
  default: [],
});