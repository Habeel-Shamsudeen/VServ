'use client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { customerState, servicesState, vehiclesState } from '../recoil/atoms';
import { Customer, Service, Vehicle } from '@/lib/types';

// Hook to fetch and set customer data
export const useCustomerData = () => {
  const [customer, setCustomer] = useRecoilState(customerState);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('/api/customer');
        const data = await response.json();

        if (data?.customer) {
          setCustomer(data.customer);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [setCustomer]);

  return customer;
};

// Hook to fetch and set vehicle data
export const useVehicleData = () => {
  const [vehicles, setVehicles] = useRecoilState(vehiclesState);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch('/api/customer'); // Same API if vehicle data is included
        const data = await response.json();

        if (data?.customer?.vehicles) {
          setVehicles(data.customer.vehicles);
        }
      } catch (error) {
        console.error('Error fetching vehicles data:', error);
      }
    };

    fetchVehicleData();
  }, [setVehicles]);

  return vehicles;
};

// Hook to fetch and set services data
export const useServiceData = () => {
  const [services, setServices] = useRecoilState(servicesState);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/api/customer'); // Same API if service data is included
        const data = await response.json();

        if (data?.customer?.services) {
          setServices(data.customer.services);
        }
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    fetchServiceData();
  }, [setServices]);

  return services;
};
