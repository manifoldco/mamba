import * as crypto from "crypto";
import { URL } from "url";
import { sign } from "./mamba";

// TODO: Figure out how to generate these keys with crypto.ECDH
const ECDSA_P521_PublicPem = `-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBR83n6JOTFqNZkag176PM0KlLJ2+i
Xkysp/5A9LST/dnGBbrZh06t6ykBdisr74b99/YigatdY7DaS4zQlaKKg6cBBzqb
hbYZUB9YrF/eqEK0qPqcYJDEI1McXngBf5iHiDbvUth/xWBbxuyFPzvtIk4mORhp
solzw04b+WnVzB985+o=
-----END PUBLIC KEY-----`;

const ECDSA_P521_PrivatePem = `-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIBp7eAMe6QHQ4Av4tEfeVYFQUn3nWHFFEAfyqOcjSUHzPFmNQpH2kM
wFpZu6XPxauBTVTnFW8QAtD1ov1L6V7aHpagBwYFK4EEACOhgYkDgYYABAFHzefo
k5MWo1mRqDXvo8zQqUsnb6JeTKyn/kD0tJP92cYFutmHTq3rKQF2Kyvvhv339iKB
q11jsNpLjNCVooqDpwEHOpuFthlQH1isX96oQrSo+pxgkMQjUxxeeAF/mIeINu9S
2H/FYFvG7IU/O+0iTiY5GGmyiXPDThv5adXMH3zn6g==
-----END EC PRIVATE KEY-----`;

describe("The sign function", () => {
  it("produces a correct signature", () => {
    const urlString = "http://example.com/?oid=23456";
    const signedURL = new URL(sign(urlString, ECDSA_P521_PrivatePem));

    const timestampedURL = new URL(urlString);
    timestampedURL.searchParams.set("ts", signedURL.searchParams.get("ts"));

    const verify = crypto.createVerify("SHA512");
    verify.update(timestampedURL.toString());

    expect(
      verify.verify(
        ECDSA_P521_PublicPem,
        signedURL.searchParams.get("sig"),
        "base64"
      )
    ).toBe(true);
  });

  describe("when the URL has a fragment", () => {
    const url = new URL(
      sign("http://example.com/?oid=23456#drop", ECDSA_P521_PrivatePem)
    );

    it("preserves the fragment", () => {
      expect(url.hash).toEqual("#drop");
    });
  });
});
