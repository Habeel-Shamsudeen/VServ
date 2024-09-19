'use client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminMechanicsState, customerState, servicesState, vehiclesState } from '../recoil/atoms';

export const useInitializeUserData = () => {
  const [customer, setCustomer] = useRecoilState(customerState);
  const [vehicles, setVehicles] = useRecoilState(vehiclesState);
  const [services, setServices] = useRecoilState(servicesState);
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setCustomer, setVehicles, setServices]);

  return { customer, vehicles, services, loading };
};


export const useInitializeAdminMechanicsData = () => {
  const [mechanics, setMechanics] = useRecoilState(adminMechanicsState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMechanicsData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/mechanic'); 
        const data = await response.json();

        if (data?.mechanics) {
          setMechanics(data.mechanics || []);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mechanics data:', error);
      }
    };

    fetchMechanicsData();
  }, [setMechanics]);

  return { mechanics, loading };
};

export const useInitializeAdminServicesData = () => {
  const [services, setServices] = useRecoilState(servicesState );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/service');
        const data = await response.json();

        if (data?.services) {
          setServices(data.services || []);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    fetchServicesData();
  }, [setServices]);

  return { services, loading };
};