import React, { useEffect, useState } from 'react';
import JobCard from "@/Pages/JobOpenings/Components/JobCard";
import { Card, Divider, List, Skeleton } from "antd";
import { JobOpening } from "@/Pages/JobOpenings/Core/Model";
import { PaginatedData } from "@/Core/Models";
import InfiniteScroll from 'react-infinite-scroll-component';
import { router } from "@inertiajs/react";

type Props = {
    jobs: PaginatedData<JobOpening>;
    jobClick: (jobId: number | string) => void;
};

// Typed Inertia response for completed jobs
type JobResponse = {
    props: {
        data: {
            completed: PaginatedData<JobOpening>;
        };
    };
};

function JobsComplete({ jobs, jobClick }: Props) {
    const [data, setData] = useState<JobOpening[]>(jobs.data);
    const [page, setPage] = useState(jobs.current_page);
    const [hasMore, setHasMore] = useState(jobs.current_page < jobs.last_page);
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        router.get(
            route("jobopenings.index", { status: "completed", page: page + 1 }),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: ['data'],

                onSuccess: (response) => {
                    // ⬅ IMPORTANT: cast unknown Inertia response
                    const res = response as unknown as JobResponse;

                    const newJobs = res.props.data.completed.data;

                    setData(prev => [...prev, ...newJobs]);
                    setPage(res.props.data.completed.current_page);
                    setHasMore(
                        res.props.data.completed.current_page <
                        res.props.data.completed.last_page
                    );
                },

                onFinish: () => setLoading(false),
            }
        );
    };

    useEffect(() => {
        setData(jobs.data);
        setPage(jobs.current_page);
        setHasMore(jobs.current_page < jobs.last_page);
    }, [jobs]);

    return (
        <Card title="Completed Jobs" style={{ margin: 0, padding: 0 }}>
            <div id="scrollableDiv-complete" style={{ height: 600, overflow: 'auto' }}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>No more completed jobs 🎉</Divider>}
                    scrollableTarget="scrollableDiv-complete"
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

export default JobsComplete;
