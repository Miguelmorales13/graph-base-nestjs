import { diskStorage } from "multer";
import { extname } from "path";
import * as uuid from "uuid";

enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  ALL = "ALL",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD"
}

export enum EnumUploads {
  images = "images",
  pdfs = "pdfs",
  xlsx = "xlsx",
  sdks = "sdks",
}

export const generateStorageMulter = (type: EnumUploads = EnumUploads.images, maxSize = 3) => (
  {
    storage: diskStorage({
      destination: `./public/uploads/${type}`,
      filename: (req, file, cb) => {
        return cb(null, `${uuid.v4()}${extname(file.originalname)}`);
      }
    }),
    limits: {
      fileSize: maxSize * 1024 * 1024
    }
  }
);

export const getMessageGeneric = (method: RequestMethod) => {
  switch (method) {
    case RequestMethod.GET:
      return "get susccessfull";
    case RequestMethod.PATCH:
      return "update susccessfull";
    case RequestMethod.DELETE:
      return "delete susccessfull";
    case RequestMethod.POST:
      return "create susccessfull";
    default:
      return "";
  }
};

export function password_generator(len: number) {
  let length = (len) ? (len) : (10);
  let string = "abcdefghijklmnopqrstuvwxyz";
  let numeric = "0123456789";
  let punctuation = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";
  let password = "";
  let character = "";
  let crunch = true;
  while (password.length < length) {
    let entity1 = Math.ceil(string.length * Math.random() * Math.random());
    let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
    let entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
    let hold = string.charAt(entity1);
    hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
    character += hold;
    character += numeric.charAt(entity2);
    character += punctuation.charAt(entity3);
    password = character;
  }
  password = password.split("").sort(function() {
    return 0.5 - Math.random();
  }).join("");
  return password.substr(0, len);
}
