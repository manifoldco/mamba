export enum CryptoError {
  DecodeError = "error:0906D064:PEM routines:PEM_read_bio:bad base64 decode",
  FormatError = "error:0906D06C:PEM routines:PEM_read_bio:no start line",
  BadKey = "error:0D07209B:asn1 encoding routines:ASN1_get_object:too long"
}

export enum MambaError {
  DecodeError = "The private key was not base64 encoded",
  FormatError = "The private key was not in PEM format",
  BadKey = "Invalid DER key"
}
