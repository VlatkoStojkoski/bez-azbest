import { S3Client } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";

export const s3Client = new S3Client({
	credentials: fromEnv(),
	region: 'eu-central-1',
});