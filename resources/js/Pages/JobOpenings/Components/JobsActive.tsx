import React, {useEffect, useState} from 'react';
import JobCard from "@/Pages/JobOpenings/Components/JobCard";
import { Card, Divider, List, Skeleton } from "antd";
import { JobOpening } from "@/Pages/JobOpenings/Core/Model";
import { PaginatedData } from "@/Core/Models";
import InfiniteScroll from 'react-infinite-scroll-component';
import { router } from "@inertiajs/react";

type Props = {
    jobs: PaginatedData;
    jobClick: (jobId: number) => void;
};

function JobsActive({ jobs, jobClick }: Props) {
    const [data, setData] = useState<JobOpening[]>(jobs.data);
    const [page, setPage] = useState(jobs.current_page);
    const [hasMore, setHasMore] = useState(jobs.current_page < jobs.last_page);
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        router.get(route("jobopenings.index", { status: "active", page: page + 1 }), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['data'],
            onSuccess: (response) => {
                const newJobs = response.props.data.active.data;

                setData(prevData => [...prevData, ...newJobs]);
                setPage(response.props.data.active.current_page);
                setHasMore(response.props.data.active.current_page < response.props.data.active.last_page);
            },
            onFinish: () => setLoading(false),
        });
    };

    useEffect(() => {
        setData(jobs.data)
    }, [jobs]);
    return (
        <Card title="Active Jobs" style={{ margin: 0, padding: 0 }}>
            <div id="scrollableDiv-active" style={{ height: 600, overflow: 'auto', margin: 0, padding: 0 }}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv-active"
                >
                    <List
                        dataSource={data}
                        renderItem={(job: JobOpening) => (
                            <JobCard
                                jobClick={jobClick}
                                jobId={job.id}
                                city={job.city}
                                department={job.department?.name}
                                e_type={job.employment_type}
                                location={job.location}
                                salary={job.salary}
                                status={job.status}
                                title={job.title}
                            />
                        )}
                    />
                </InfiniteScroll>
            </div>
        </Card>
    );
}
export default JobsActive;
