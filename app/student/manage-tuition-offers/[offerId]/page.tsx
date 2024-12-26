import DetailedTuitionOffer from "@/components/student/manage-tuition-offers/detailed-tuition-offer";

export default async function TuitionOfferDetails({
    params,
}: {
    params: Promise<{ offerId: string }>;
}) {
    const offerId = (await params).offerId;

    return <DetailedTuitionOffer offerId={offerId} />;
}
