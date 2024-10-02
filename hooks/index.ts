'use client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminMechanicsState, customerState, mechanicsState, servicesState, vehiclesState } from '../recoil/atoms';

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
        const response = await fetch('/api/admin/mechanic'); 
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
        const response = await fetch('/api/admin/service');
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

export const useInitializeMechanicData = () => {
  const [mechanic, setMechanic] = useRecoilState(mechanicsState); // Access mechanic state
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const fetchMechanicData = async () => {
      try {
        const response = await fetch('/api/mechanic');
        const data = await response.json();

        if (data?.mechanic) {
          setMechanic(data.mechanic || null); // Update the mechanic state with the response
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching mechanic data:', error);
        setLoading(false); // Ensure loading is set to false even in case of error
      }
    };

    fetchMechanicData();
  }, [setMechanic]);

  return { mechanic, loading }; // Return mechanic details and loading status
};

export const useInitializeMechanicServices = () => {
  const [services, setServices] = useRecoilState(servicesState); // Access and update services state
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const fetchMechanicServices = async () => {
      try {
        const response = await fetch('/api/mechanic/services'); // Fetch mechanic services
        const data = await response.json();

        if (data?.services) {
          setServices(data.services || []); // Update services state with the fetched data
        }
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching mechanic services:', error);
        setLoading(false); // Ensure loading state is updated even in case of error
      }
    };

    fetchMechanicServices();
  }, [setServices]);

  return { services, loading }; // Return services and loading status
};