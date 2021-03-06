import { generateKeyPairSync, ECKeyPairOptions } from "crypto";
import { URL } from "url";
import { VIPER } from "./test-keys";
import { sign, verify, formatPrivateDERKey } from "../mamba";
import { MambaError } from "../errors";

const urlString = "https://api.manifold.co/v1/users?bar=foo&abc=cba";

describe("The sign function", () => {
  const keyPair = generateKeyPairSync("ec", <ECKeyPairOptions<"pem", "der">>{
    namedCurve: "secp521r1",
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    },
    privateKeyEncoding: {
      format: "der",
      type: "sec1"
    }
  });

  it("produces a correct signature", () => {
    const signedURL = new URL(
      sign(urlString, formatPrivateDERKey(keyPair.privateKey))
    );

    expect(verify(signedURL.toString(), keyPair.publicKey)).toBe(true);
  });

  describe("when the URL has a fragment", () => {
    const url = new URL(
      sign(
        "http://example.com/?oid=23456#drop",
        formatPrivateDERKey(keyPair.privateKey)
      )
    );

    it("preserves the fragment", () => {
      expect(url.hash).toEqual("#drop");
    });
  });

  describe("when Jelmer gives me a private key", () => {
    it("produces a correct signature", () => {
      const signedURL = new URL(sign(urlString, VIPER.private));

      expect(verify(signedURL.toString(), VIPER.public)).toBe(true);
    });
  });

  describe("when Jelmer gives me a signed URL and a public key", () => {
    it("can be verified", () => {
      const signedURL = new URL(VIPER.url);

      expect(verify(signedURL.toString(), VIPER.public)).toBe(true);
    });
  });

  describe("with a key that's not encoded", () => {
    const key = formatPrivateDERKey("bogus");

    it("throws a decoder error", () => {
      expect(() => sign(urlString, key)).toThrowError(MambaError.DecodeError);
    });
  });

  describe("with a badly formatted key", () => {
    const key = new Buffer("bogus").toString("base64");

    it("throws a formatting error", () => {
      expect(() => sign(urlString, key)).toThrowError(MambaError.FormatError);
    });
  });

  describe("with a bogus key", () => {
    const key = formatPrivateDERKey(new Buffer("bogus").toString("base64"));

    it("throws a bad key error", () => {
      expect(() => sign(urlString, key)).toThrowError(MambaError.BadKey);
    });
  });

  describe("with a bad URL", () => {
    it("propagates a URL parsing error", () => {
      expect(() =>
        sign("not-a-url", formatPrivateDERKey(keyPair.privateKey))
      ).toThrowError();
    });
  });
});
