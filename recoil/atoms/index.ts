import { atom } from 'recoil';
import { Customer, Service, Vehicle } from '../../lib/types';


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
