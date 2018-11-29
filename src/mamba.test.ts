import { createVerify, generateKeyPairSync, ECKeyPairOptions } from "crypto";
import { URL } from "url";
import { sign } from "./mamba";

describe("The sign function", () => {
  const keyPair = generateKeyPairSync("ec", <ECKeyPairOptions<"pem", "pem">>{
    namedCurve: "secp521r1",
    privateKeyEncoding: {
      format: "pem",
      type: "sec1"
    },
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    }
  });

  it("produces a correct signature", () => {
    const urlString = "https://api.manifold.co/v1/users?bar=foo&abc=cba";
    const signedURL = new URL(sign(urlString, keyPair.privateKey));

    const timestampedURL = new URL(urlString);
    timestampedURL.searchParams.set("ts", signedURL.searchParams.get("ts"));

    const verify = createVerify("SHA512");
    verify.update(timestampedURL.toString());

    expect(
      verify.verify(
        keyPair.publicKey,
        signedURL.searchParams.get("sig"),
        "base64"
      )
    ).toBe(true);
  });

  describe("when the URL has a fragment", () => {
    const url = new URL(
      sign("http://example.com/?oid=23456#drop", keyPair.privateKey)
    );

    it("preserves the fragment", () => {
      expect(url.hash).toEqual("#drop");
    });
  });
});
