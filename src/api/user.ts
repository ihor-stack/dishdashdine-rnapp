import request from './';

export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  email: string;
  emailConfirmed: boolean;
  dateOfBirth: string;
  offerNotifications: boolean;
  otherNotifications: boolean;
  orderNotifications: boolean;
  primaryUserRole: string;
  noAuth?: boolean;
  dateJoined: string;
}

export interface IUserData {
  phoneNumber?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  offerNotifications?: boolean;
  otherNotifications?: boolean;
  orderNotifications?: boolean;
}

export interface IPushNotificationToken {
  deviceToken: string;
}

const UserService = {
  updateUser(data: IUserData) {
    return request({
      url: '/api/User',
      data,
      method: 'POST',
    });
  },
  getUser() {
    return request({
      url: '/api/User',
      method: 'GET',
    });
  },
  deleteUser(password: string) {
    return request({
      url: '/api/User',
      data: {
        password,
      },
      method: 'DELETE',
    });
  },
  savePushNotificationToken(data: IPushNotificationToken) {
    return request({
      url: '/api/User/PushNotificationToken',
      method: 'POST',
      data,
    });
  },
  deletePushNotificationToken(data: IPushNotificationToken) {
    return request({
      url: '/api/User/PushNotificationToken',
      method: 'DELETE',
      data,
    });
  },
  confirmUser(data: {token: string}) {
    return request({
      url: '/api/User/ConfirmAccount',
      data,
      method: 'POST',
    });
  },
};

export default UserService;
