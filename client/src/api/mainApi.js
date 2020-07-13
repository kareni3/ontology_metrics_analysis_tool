import API from './api';

const api = new API();

export default {
  getClasses(minVersion, maxVersion) {
    return api.get(`http://127.0.0.1:3001/classes?min_version=${(minVersion || 1)}&max_version=${maxVersion || 1000}`);
  },
  getVocabularies(minVersion, maxVersion) {
    return api.get(`http://127.0.0.1:3001/vocabularies?min_version=${(minVersion || 1)}&max_version=${maxVersion || 1000}`);
  },
};
