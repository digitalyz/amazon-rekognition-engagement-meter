import request from "./request";
import { v4 as uuid } from 'uuid';

const gateway = {
  addUser(params) {
    const externalImageId = uuid();
    return request("/faces/add", "post", {
      externalImageId,
      image: params.image,
    }).then(() =>
      request("/people", "post", {
        externalImageId,
        memberName: params.fullName,
        jobTitle: params.jobTitle,
      })
    );
  },

  detectFaces(image) {
    return request("/faces/detect", "post", { image });
  },

  getEngagement() {
    const timeDetected = new Date().getTime() - 3600 * 90;
    return request(`/engagement?timeDetected=${timeDetected}`);
  },

  getPeople() {
    return request("/people");
  },

  postEngagement(detectedFace) {
    const normalize = (x) => detectedFace.emotions[x] || 0;

    return request(`/engagement`, "post", {
      timeDetected: new Date().getTime(),
      angry: normalize("Colère"),
      calm: normalize("Calme"),
      happy: normalize("Heureux"),
      sad: normalize("Triste"),
      surprised: normalize("Surpris"),
    });
  },

  searchFaces(image) {
    return request(`/faces/search`, "post", { image });
  },
};

export default gateway;
