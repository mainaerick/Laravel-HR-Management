import React, {useEffect, useState} from 'react';
import JobCard from "@/Pages/JobOpenings/Components/JobCard";
import { Card, Divider, List, Skeleton } from "antd";
import { JobOpening } from "@/Pages/JobOpenings/Core/Model";
import InfiniteScroll from "react-infinite-scroll-component";
import { router } from "@inertiajs/react";
import { PaginatedData } from "@/Core/Models";

type Props = {
    jobs: PaginatedData;
    jobClick: (jobId: number) => void;
};

function JobsInActive({ jobs ,jobClick}: Props) {
    const [data, setData] = useState<JobOpening[]>(jobs.data);
    const [page, setPage] = useState(jobs.current_page);
    const [hasMore, setHasMore] = useState(jobs.current_page < jobs.last_page);
    const [loading, setLoading] = useState(false);

    const loadMoreData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        router.get(route("jobopenings.index", { status: "inactive", page: page + 1 }), {}, {
            preserveScroll: true,
            preserveState: true,
            only: ['data'],
            onSuccess: (response) => {
                const newJobs = response.props.data.inactive.data;

                setData(prevData => [...prevData, ...newJobs]);
                setPage(response.props.data.inactive.current_page);
                setHasMore(response.props.data.inactive.current_page < response.props.data.inactive.last_page);
            },
            onFinish: () => setLoading(false),
        });
    };
    useEffect(() => {
        setData(jobs.data)
    }, [jobs]);
    return (
        <Card title="Inactive Jobs">
            <div id="scrollableDiv-inactive" style={{ height: 600, overflow: 'auto', margin: 0, padding: 0 }}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv-inactive"
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

export default JobsInActive;
