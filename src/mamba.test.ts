import { createVerify, generateKeyPairSync, ECKeyPairOptions } from "crypto";
import { URL } from "url";
import { sign, formatDerKey, KeyType } from "./mamba";

const derKey =
  "MIHcAgEBBEIB2S91qFV6PwD/WnxEw8zNIOkkYwiScpUVFlP7ddXQR3n33w9ojvwXXh2VJIritB65PWQpWSzpaJ+Pe+nOr7nXa8OgBwYFK4EEACOhgYkDgYYABACV16gCZ7d6E/3iNbTMSZePyWSWxmxRpwxe7dMWD120ex6hM4czXjcwLeOXo8JQ7I2PJoFTDcTM54lkvCGsGWl1hwBkwLJGLctkaM+bXCWtFxPy2vqq+2fzcJUwl1ySAwa5hyGZ9oy1+voKxyFJCP64T7BY2eFxjOFt4GjdTT+EOlnEVw==";

const JELMER_KEY = formatDerKey(derKey, KeyType.Private);

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
    const urlString = "https://api.manifold.co/v1/users?bar=foo&abc=cba";
    const signedURL = new URL(
      sign(urlString, formatDerKey(keyPair.privateKey, KeyType.Private))
    );

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
      sign(
        "http://example.com/?oid=23456#drop",
        formatDerKey(keyPair.privateKey, KeyType.Private)
      )
    );

    it("preserves the fragment", () => {
      expect(url.hash).toEqual("#drop");
    });
  });

  describe("when Jelmer gives me a key", () => {
    it("produces a correct signature", () => {
      const urlString =
        "https://api.manifold.co/v1/users?bar=foo&abc=cba&ts=1543581583488";
      const signedURL = new URL(sign(urlString, JELMER_KEY));
    });
  });
});
