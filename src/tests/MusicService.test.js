/*eslint-disable*/
import faker from "faker";

import { FirebaseService } from "../services/FirebaseService";
import { MusicService } from "../services/MusicService";

jest.mock("../services/FirebaseService");

const randomId = faker.random.uuid();
const database = FirebaseService.database();

describe("firebase database functions", () => {
  afterEach(() => {
    database.ref.mockClear();
    database.once.mockClear();
  });

  test("getAlbums function calls firebase functions with proper arguments", async () => {
    const data = await MusicService.getAlbums();
    expect(data.constructor).toBe(Array);
    expect(database.ref).toHaveBeenCalledWith("albums");
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(1);
  });

  test("getAuthors function calls firebase functions with proper arguments", async () => {
    const data = await MusicService.getAuthors();
    expect(data.constructor).toBe(Array);
    expect(database.ref).toHaveBeenCalledWith("authors");
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(1);
  });

  test("getAlbumSongs function calls firebase functions with proper arguments", async () => {
    await MusicService.getAlbumSongs(randomId);
    expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
    expect(database.ref).toHaveBeenCalledTimes(2);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(2);
  });

  test("getAuthorSongs function calls firebase functions with proper arguments", async () => {
    await MusicService.getAuthorSongs(randomId);
    expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
    expect(database.ref).toHaveBeenCalledTimes(2);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(2);
  });

  test("getAlbumById function calls firebase functions with proper arguments", async () => {
    await MusicService.getAlbumById(randomId);
    expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(1);
  });

  test("getAuthorById function calls firebase functions with proper arguments", async () => {
    await MusicService.getAuthorById(randomId);
    expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(1);
  });

  test("getSongById function calls firebase functions with proper arguments", async () => {
    await MusicService.getSongById(randomId);
    expect(database.ref).toHaveBeenCalledWith(`songs/${randomId}`);
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(1);
  });

  test("getSongRating function calls firebase functions with proper arguments", async () => {
    await MusicService.getSongRating(randomId);
    expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/rating/`);
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.once).toHaveBeenCalledWith("value");
    expect(database.once).toHaveBeenCalledTimes(1);
  });

  test("setNewRating function calls firebase functions with proper arguments", async () => {
    const songId = faker.random.uuid();
    const ratingValue = faker.random.word();
    await MusicService.setNewRating(randomId, songId, ratingValue);
    expect(database.ref).toHaveBeenCalledWith(
      `users/${randomId}/rating/${songId}`
    );
    expect(database.ref).toHaveBeenCalledTimes(1);
    expect(database.set).toHaveBeenCalledWith(ratingValue);
    expect(database.set).toHaveBeenCalledTimes(1);
  });
});

test("getAuthorNamesByIds resolves data to be an array", async () => {
  expect.assertions(1);
  await expect(MusicService.getAuthorNamesByIds([randomId])).resolves.toEqual(
    expect.any(Array)
  );
});
