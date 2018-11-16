/*eslint-disable*/
export const data = { key: "value", songs: ["song1"], name: "unnamed" };
const snapshot = { val: () => data };
const database = jest.fn();
database.mockReturnValue({
  ref: jest.fn().mockReturnThis(),
  once: jest.fn(() => Promise.resolve(snapshot)),
  set: jest.fn()
});
export const FirebaseService = {
  database
};
