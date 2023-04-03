import request from './';

export interface IAuthenticate {
  emailAddress: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
}

export interface IRefreshData {
  client_id: string;
  grant_type: string;
  refresh_token: string;
}
export interface IResetPassword {
  emailAddress: string;
}

const IdentityService = {
  authenticate(data: IAuthenticate) {
    return request({
      url: '/api/Identity/Authenticate',
      method: 'POST',
      data,
    });
  },
  register(data: IRegister) {
    return request({
      url: '/api/Identity/Register',
      method: 'POST',
      data,
    });
  },
  resetPassword(data: IResetPassword) {
    return request({
      url: '/api/Identity/ResetPassword',
      method: 'POST',
      data,
    });
  },
};

export default IdentityService;
