import { selector } from 'recoil';
import { adminMechanicsState, servicesState } from '../atoms';
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

export const unassignedServicesSelector = selector({
  key: 'unassignedServicesSelector',
  get: ({ get }) => {
    const services = get(servicesState);
    return services.filter(service => service.status === ServiceStatus.PENDING);
  },
});

export const onGoingServicesSelector = selector({
  key: 'onGoingServicesSelector',
  get: ({ get }) => {
    const services = get(servicesState);
    return services.filter(service => service.status !== ServiceStatus.PENDING && service.status !== ServiceStatus.COMPLETED);
  },
});


export const unassignMechanicsSelector = selector({
  key: 'unassignMechanicsSelector',
  get: ({ get }) => {
    const mechanics = get(adminMechanicsState);

    return mechanics.filter((mech) => {
      const services = mech.mechanic?.services || [];
      const isUnassigned =
        services.length === 0 || services.every(service => service.status === 'COMPLETED');
      return isUnassigned;
    });
  }
});
