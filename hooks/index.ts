'use client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { customerState, servicesState, vehiclesState } from '../recoil/atoms';

export const useInitializeUserData = () => {
  const [customer, setCustomer] = useRecoilState(customerState);
  const [vehicles, setVehicles] = useRecoilState(vehiclesState);
  const [services, setServices] = useRecoilState(servicesState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/customer'); 
        const data = await response.json();

        if (data?.customer) {
          setCustomer(data.customer);
          setVehicles(data.customer.vehicles || []);
          setServices(data.customer.services || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setCustomer, setVehicles, setServices]);

  return { customer, vehicles, services };
};
