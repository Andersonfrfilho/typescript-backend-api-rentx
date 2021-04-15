import { S3 } from "aws-sdk";
import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    await fs.promises.readFile(originalName);
  }
  delete(file: string, folder: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
