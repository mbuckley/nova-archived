import * as uuid from "./helpers";
import { uuidWithPrefix } from "./helpers";

describe("Helpers", () => {
  beforeAll(() => {
    spyOn(uuid, "uuid").and.returnValue("testUUID");
  });

  describe("#uuidWithPrefix", () => {
    it("creates a uuid with that is prefixed with a default of 'item-'", () => {
      expect(uuidWithPrefix()).toBe("item-testUUID");
    });

    it("creates a uuid that is prefixed", () => {
      expect(uuidWithPrefix("test-prefix")).toBe("test-prefix-testUUID");
    });
  });
});
