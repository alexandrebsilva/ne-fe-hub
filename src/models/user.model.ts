export type COMPANY_LOCATION_DETAILS = {
  shoppingMallName: string;
  floor: string;
  room: string;
};

export interface AddressProps {
  streetAddress?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  postalCode?: string;
}
export interface PersonProps {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender?: string;
  cpf?: string;
  rg?: string;
  rgIssuingAgency?: string;
  rgIssueDate?: Date;
  placeOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  fatherName?: string;
  motherName?: string;
  transportationVoucherOptIn?: boolean;
  educationLevel?: string;
  firstJob?: boolean;
  authorizeUnionContributionDiscount?: boolean;
  authorizeConfederativeContributionDiscount?: boolean;
  isReceivingUnemploymentInsurance?: boolean;
  rgFrontImage?: string;
  proofOfResidenceImage?: string;
  workCardImage?: string;
  score?: number;
  pixKey?: string;
  rgBackImage?: string;
  pixKeyType?: string;
  shirtSize?: string;
  pantSize?: string;
  shoeSize?: string;
  race?: string;
  dependents?: Dependent[];
  user?: UserProps;
  address?: AddressProps;
}

export interface Dependent {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  cpf?: string;
  rg?: string;
  issuingAgency?: string;
  rgIssueDate?: Date;
  person: PersonProps;
}

export interface CompanyProps {
  uuid: string;
  name: string;
  legalName: string;
  document: string;
  isOwnCompany: boolean;
  locationDetails: COMPANY_LOCATION_DETAILS;
  isActive: boolean;
}

export enum ALLOWED_ROLE_NAMES {
  'AGREEMENT_EMPLOYEE' = 'AGREEMENT_EMPLOYEE',
  'INDEPENDENT_EMPLOYEE' = 'INDEPENDENT_EMPLOYEE',
  'AGREEMENT_EMPLOYER' = 'AGREEMENT_EMPLOYER',
  'AGREEMENT_MANAGER' = 'AGREEMENT_MANAGER',
  'INTERNAL_EMPLOYEE' = 'INTERNAL_EMPLOYEE',
  'INTERNAL_MANAGER' = 'INTERNAL_MANAGER',
  'ADMIN' = 'ADMIN',
}
export interface RoleProps {
  uuid: string;
  name: ALLOWED_ROLE_NAMES;
  description: string | null;
}

export interface UserProps {
  uuid: string;
  userId?: string;
  phone: string;
  username?: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified: boolean;
  tokenVersion?: number;
  refreshToken: string | null;
  role: RoleProps;
  company: CompanyProps;
  person: PersonProps;
  address?: AddressProps;
}
