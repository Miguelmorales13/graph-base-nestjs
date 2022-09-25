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