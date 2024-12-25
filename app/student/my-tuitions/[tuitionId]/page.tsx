import DetailedTuition from "@/components/student/my-tuitions/detailed-tuition";

export default async function TuitionDetailPage({
    params,
}: {
    params: Promise<{ tuitionId: string }>;
}) {
    const tuitionId = (await params).tuitionId;

    return <DetailedTuition tuitionId={tuitionId} />;
}
