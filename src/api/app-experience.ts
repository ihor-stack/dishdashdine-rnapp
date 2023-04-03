import API from './';

const AppExperienceService = {
  submitAppExperience(data: {message: string}) {
    return API({
      url: '/api/AppExperience/Submit',
      method: 'POST',
      data,
    });
  },
  getAllAppExperience() {
    return API({
      url: '/api/AppExperience/My',
      method: 'GET',
    });
  },
};

export default AppExperienceService;
