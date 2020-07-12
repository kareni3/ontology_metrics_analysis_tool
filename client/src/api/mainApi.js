import API from './api';

const api = new API();

export default {
  getClasses(minVersion) {
    return api.get('http://127.0.0.1:3001/classes?version_number=' + (minVersion || 1));
  },
  getVocabularies(minVersion) {
    return api.get('http://127.0.0.1:3001/vocabularies?version_number=' + (minVersion || 1));
  },
};
