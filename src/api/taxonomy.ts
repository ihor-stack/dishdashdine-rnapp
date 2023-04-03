import API from './';

const TaxonomyService = {
  getTaxonomy() {
    return API({
      url: '/api/Taxonomy',
      method: 'GET',
    });
  },
};

export default TaxonomyService;
