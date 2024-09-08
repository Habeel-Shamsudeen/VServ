import { selector } from 'recoil';
import { servicesState } from '../atoms';
import { ServiceStatus } from '../../lib/types';

// Selector to get only the active services
export const activeServicesSelector = selector({
  key: 'activeServicesSelector',
  get: ({ get }) => {
    const services = get(servicesState);
    return services.filter(service => service.status !== ServiceStatus.COMPLETED);
  },
});

// Selector to get only the completed services
export const completedServicesSelector = selector({
  key: 'completedServicesSelector',
  get: ({ get }) => {
    const services = get(servicesState);
    return services.filter(service => service.status === ServiceStatus.COMPLETED);
  },
});
