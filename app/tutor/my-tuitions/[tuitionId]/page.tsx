import DetailedTuition from "@/components/my-tuitions/detailed-tuition";

export default async function TuitionDetailPage({
    params,
}: {
    params: Promise<{ tuitionId: string }>;
}) {
    const tuitionId = (await params).tuitionId;

    return <DetailedTuition tuitionId={tuitionId} />;
}
