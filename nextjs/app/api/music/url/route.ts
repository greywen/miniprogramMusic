import prisma from '@/prisma/prisma';
import { Client } from 'minio';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = +(searchParams.get('id') || 0);
  const mid = searchParams.get('mid');
  const name = searchParams.get('name');

  let music = await prisma.music.findUnique({ where: { id } });
  if (!music) {
    throw new Error('music not found');
  }

  const { MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_ENDPOINT, MINIO_PORT } =
    process.env;

  const minIOClient = new Client({
    endPoint: MINIO_ENDPOINT!,
    useSSL: true,
    accessKey: MINIO_ACCESS_KEY!,
    secretKey: MINIO_SECRET_KEY!,
    port: +MINIO_PORT!,
  });

  const bucketName = process.env.MINIO_BUCKET_NAME!;
  const url = await minIOClient.presignedGetObject(
    bucketName,
    music!.filePath!
  );
  return NextResponse.json({ url });
}
