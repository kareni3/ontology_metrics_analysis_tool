import API from './api';

const api = new API();

export default {
  getClasses(minVersion, maxVersion, incomingLinks, outgoingLinks) {
    return api.get(`http://127.0.0.1:3001/classes`, {
      params: {
        min_version: minVersion || 1,
        max_version: maxVersion || 1000,
        incoming_links: JSON.stringify(incomingLinks || {min: 0, max: 100000}),
        outgoing_links: JSON.stringify(outgoingLinks || {min: 0, max: 100000}),
      }
    });
  },
  getVocabularies(minVersion, maxVersion, incomingLinks, outgoingLinks) {
    return api.get(`http://127.0.0.1:3001/vocabularies`, {
      params: {
        min_version: minVersion || 1,
        max_version: maxVersion || 1000,
        incoming_links: JSON.stringify(incomingLinks || {min: 0, max: 100000}),
        outgoing_links: JSON.stringify(outgoingLinks || {min: 0, max: 100000}),
      }
    });
  },
};
