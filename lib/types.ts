import NextAuth from "next-auth";

// to extent the return type of session callback
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name:string
    };
  }

  interface User {
    id: string;
    email: string;
    role: string;
  }
}

export interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
  role: Role;
  phoneNumber?: string;
  customer?: Customer;
  mechanic?: Mechanic;
}

export interface Customer {
  id: number;
  userId: number;
  user: User;
  address: string;
  vehicles: Vehicle[];
  services: Service[];
}

export interface Mechanic {
  id: number;
  userId: number;
  user: User;
  speciality: ServiceType;
  services: Service[];
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  customerId: number;
  customer: Customer;
  services: Service[];
}

export interface Service {
  id: number;
  description: string;
  status: ServiceStatus;
  scheduledAt?: Date;
  completedAt?: Date;
  customerId: number;
  mechanicId?: number;
  vehicleId?: number;
  cost: number;
  serviceType: ServiceType;
  customer: Customer;
  mechanic?: Mechanic;
  vehicle?: Vehicle;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  MECHANIC = 'MECHANIC',
}

export enum ServiceStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  PICKING_UP = 'PICKING_UP',
  INSPECTING = 'INSPECTING',
  WORKING = 'WORKING',
  COMPLETED = 'COMPLETED',
}

export enum ServiceType {
  OIL_CHANGE = 'OIL_CHANGE',
  TIRE_ROTATION = 'TIRE_ROTATION',
  BRAKE_INSPECTION = 'BRAKE_INSPECTION',
  BATTERY_REPLACEMENT = 'BATTERY_REPLACEMENT',
  ENGINE_DIAGNOSTIC = 'ENGINE_DIAGNOSTIC',
  GENERAL_MAINTENANCE = 'GENERAL_MAINTENANCE',
}

export const serviceStatusDetails = {
  [ServiceStatus.PENDING]: {
    percentage: 0,
    description: 'Service has been requested but is not yet assigned.',
  },
  [ServiceStatus.ASSIGNED]: {
    percentage: 20,
    description: 'Service has been assigned to a mechanic.',
  },
  [ServiceStatus.PICKING_UP]: {
    percentage: 40,
    description: 'The vehicle is in the process of being picked up for service.',
  },
  [ServiceStatus.INSPECTING]: {
    percentage: 60,
    description: 'The vehicle is being inspected by the mechanic.',
  },
  [ServiceStatus.WORKING]: {
    percentage: 80,
    description: 'Service work is in progress.',
  },
  [ServiceStatus.COMPLETED]: {
    percentage: 100,
    description: 'Service has been completed successfully.',
  },
};


