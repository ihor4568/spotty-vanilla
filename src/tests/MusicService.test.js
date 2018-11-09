/* eslint-disable no-undef */
import faker from "faker";

import { MusicService } from "../services/MusicService";

const albums = [
  {
    authors: [faker.name.findName()],
    downloadURL: faker.internet.url(),
    id: faker.random.uuid(),
    imageURL: faker.image.imageUrl(),
    licenseInfo: faker.random.words(),
    licenseURL: faker.internet.url(),
    name: faker.name.title(),
    songs: [faker.random.uuid()]
  }
];

MusicService.getAlbums = jest
  .fn()
  .mockImplementation(() => Promise.resolve(albums));

describe("getAlbums", () => {
  test("resolve returns array of objects", () => {
    expect.assertions(1);
    return MusicService.getAlbums().then(data => {
      expect(data).toEqual(expect.arrayContaining(albums));
    });
  });

  test("object contains required fields", () => {
    expect.assertions(1);
    return MusicService.getAlbums().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            authors: expect.any(Array),
            downloadURL: expect.any(String),
            id: expect.any(String),
            imageURL: expect.any(String),
            licenseInfo: expect.any(String),
            licenseURL: expect.any(String),
            name: expect.any(String),
            songs: expect.any(Array)
          })
        ])
      );
    });
  });
});
