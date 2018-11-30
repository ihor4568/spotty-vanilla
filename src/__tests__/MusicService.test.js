/* eslint-disable no-undef,import/named */
import faker from "faker";

import {
  data as expectedResult,
  snapshot,
  FirebaseService
} from "../services/FirebaseService";
import { MusicService } from "../services/MusicService";

jest.mock("../services/FirebaseService");

const database = FirebaseService.database();
const randomId = faker.random.uuid();

afterEach(() => {
  jest.clearAllMocks();
});

describe("MusicService", () => {
  describe("getAlbums", () => {
    it("should return an array with proper data", async () => {
      const expected = ["unnamed", ["song"]];
      const result = await MusicService.getAlbums();
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("should should call firebase functions with proper arguments", async () => {
      await MusicService.getAlbums();
      expect(database.ref).toHaveBeenCalledWith("albums");
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getAuthors", () => {
    it("should return an array with proper data", async () => {
      const expected = ["unnamed", ["song"]];
      const result = await MusicService.getAuthors();
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("should should call firebase functions with proper arguments", async () => {
      await MusicService.getAuthors();
      expect(database.ref).toHaveBeenCalledWith("authors");
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getAuthorSongs", () => {
    it("should return an array with proper data", async () => {
      const expected = [expectedResult];
      const result = await MusicService.getAuthorSongs(randomId);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("should should call firebase functions with proper arguments", async () => {
      await MusicService.getAuthorSongs(randomId);
      expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getAlbumSongs", () => {
    it("should return an array with proper data", async () => {
      const expected = [expectedResult];
      const result = await MusicService.getAlbumSongs(randomId);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("should should call firebase functions with proper arguments", async () => {
      await MusicService.getAlbumSongs(randomId);
      expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getAlbumById", () => {
    it("should return an object with proper data", async () => {
      const result = await MusicService.getAlbumById(randomId);
      expect(result).toEqual(expectedResult);
    });

    it("should should call firebase functions with proper arguments", async () => {
      await MusicService.getAlbumById(randomId);
      expect(database.ref).toHaveBeenCalledWith(`albums/${randomId}`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getAuthorById", () => {
    it("should return an object with proper data", async () => {
      const result = await MusicService.getAuthorById(randomId);
      expect(result).toEqual(expectedResult);
    });

    it("should call firebase functions with proper arguments", async () => {
      await MusicService.getAuthorById(randomId);
      expect(database.ref).toHaveBeenCalledWith(`authors/${randomId}`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getUserSongs", () => {
    const returnValue = ["song1"];
    const prev = snapshot.val;

    afterAll(() => {
      snapshot.val = prev;
    });

    it("should return an array with proper data", async () => {
      snapshot.val = () => returnValue;
      const expected = [returnValue];
      const result = await MusicService.getUserSongs(randomId);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("should return empty array if there is no data", async () => {
      snapshot.val = () => null;
      const result = await MusicService.getUserSongs(randomId);
      expect(result).toEqual([]);
    });

    it("should call firebase functions with proper arguments", async () => {
      snapshot.val = () => returnValue;
      await MusicService.getUserSongs(randomId);
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/songs`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("setUserSong", () => {
    const returnValue = ["song1", "song2"];
    const prev = snapshot.val;

    afterAll(() => {
      snapshot.val = prev;
    });

    it("should call firebase functions with proper arguments", async () => {
      snapshot.val = () => returnValue;
      await MusicService.setUserSong(randomId, "song3");
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/songs`);
      expect(database.once).toHaveBeenCalledWith("value");
    });

    it("should call firebase functions with proper arguments if there is no given song as the argument yet", async () => {
      snapshot.val = () => returnValue;
      await MusicService.setUserSong(randomId, "song3");
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/songs/2`);
      expect(database.set).toHaveBeenCalledWith("song3");
    });

    it("should call firebase functions with proper arguments if once function's promise returns null", async () => {
      snapshot.val = () => null;
      await MusicService.setUserSong(randomId, "song1");
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/songs/0`);
      expect(database.set).toHaveBeenCalledWith("song1");
    });
  });

  describe("removeUserSong", () => {
    it("should call firebase functions with proper arguments", async () => {
      const prev = snapshot.val;
      snapshot.val = () => ["song1", "song2"];
      await MusicService.removeUserSong(randomId, "song1");
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/songs`);
      expect(database.once).toHaveBeenCalledWith("value");
      expect(database.set).toHaveBeenCalledWith(["song2"]);
      snapshot.val = prev;
    });
  });

  describe("getSongById", () => {
    it("should return an object with proper data", async () => {
      const result = await MusicService.getSongById(randomId);
      expect(result).toEqual(expectedResult);
    });

    it("should should call firebase functions with proper arguments", async () => {
      await MusicService.getSongById(randomId);
      expect(database.ref).toHaveBeenCalledWith(`songs/${randomId}`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("getAuthorNamesByIds", () => {
    it("should return an array with proper data", async () => {
      const expected = ["unnamed"];
      const result = await MusicService.getAuthorNamesByIds([randomId]);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("should return an array with the same length as the given array of arguments", async () => {
      const result = await MusicService.getAuthorNamesByIds([randomId]);
      expect(result.length).toBe(1);
    });
  });

  describe("getSongRating", () => {
    it("should return an object with proper data", async () => {
      const result = await MusicService.getSongRating(randomId);
      expect(result).toEqual(expectedResult);
    });

    it("should return empty object if there is no data", async () => {
      const prev = snapshot.val;
      snapshot.val = () => null;

      const result = await MusicService.getSongRating(randomId);
      expect(result).toEqual({});

      snapshot.val = prev;
    });

    it("should call firebase functions with proper arguments", async () => {
      await MusicService.getSongRating(randomId);
      expect(database.ref).toHaveBeenCalledWith(`users/${randomId}/rating/`);
      expect(database.once).toHaveBeenCalledWith("value");
    });
  });

  describe("setNewSongRating", () => {
    it("should should call firebase functions with proper arguments", async () => {
      const songId = faker.random.uuid();
      const rating = faker.random.number();
      await MusicService.setNewSongRating(randomId, songId, rating);
      expect(database.ref).toHaveBeenCalledWith(
        `users/${randomId}/rating/${songId}`
      );
      expect(database.set).toHaveBeenCalledWith(rating);
    });
  });
});
