import { redirect } from 'next/navigation';

export default async function EnkojiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/ong/enkoji/horta-e-arvores`);
}
