import DetailedAppliedTuitionOffer from "@/components/manage-tuition-offers/detailed-applied-tuition-offer";

export default async function Page({
    params,
}: {
    params: Promise<{ offerId: string }>;
}) {
    const offerId = (await params).offerId;
    return <DetailedAppliedTuitionOffer offerId={offerId} />;
}
