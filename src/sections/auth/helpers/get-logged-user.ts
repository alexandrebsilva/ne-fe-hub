export type LoggedUserLocalStorage = {
  isActive: boolean;
  isVerified: boolean;
  person: {
    firstName: string;
    lastName: string;
  };
  role: {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
  };
  company: {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    legalName: string;
    document: string;
    isOwnCompany: boolean;
    locationDetails: {
      floor: string;
      room: string;
      shoppingMallName: string;
    };
    isActive: boolean;
  };
};

export default function getLoggedUserFromLocalStorage(): LoggedUserLocalStorage | undefined {
  const localUserContent = localStorage.getItem('user');
  let loggedUser = null;

  if (localUserContent) {
    loggedUser = JSON.parse(localUserContent);
  }

  return loggedUser;
}
