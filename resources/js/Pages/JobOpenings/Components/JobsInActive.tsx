import React, {useEffect, useState} from 'react';
import JobCard from "@/Pages/JobOpenings/Components/JobCard";
import {Card, Divider, List, Skeleton} from "antd";
import {JobOpening} from "@/Pages/JobOpenings/Core/Model";
import InfiniteScroll from "react-infinite-scroll-component";
import {router} from "@inertiajs/react";
import {PaginatedData} from "@/Core/Models";

type Props = {
    jobs: PaginatedData;
    jobClick: (jobId: number | string) => void;
};

function JobsInActive({jobs, jobClick}: Props) {
    const [data, setData] = useState<JobOpening[]>(jobs.data);
    const [page, setPage] = useState(jobs.current_page);
    const [hasMore, setHasMore] = useState(jobs.current_page < jobs.last_page);
    const [loading, setLoading] = useState(false);

    const loadMoreData = () => {
        if (loading || !hasMore) return;

        setLoading(true);

        router.get(
            route("jobopenings.index", {status: "inactive", page: page + 1}),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: ['jobs'], // Ensure we are only updating jobs to prevent unnecessary re-renders
                onSuccess: (response) => {
                    if (response.props.jobs && typeof response.props.jobs === 'object' && 'current_page' in response.props.jobs && 'data' in response.props.jobs &&'last_page' in response.props.jobs) {
                        const newJobs = response.props.jobs.data as any; // Ensure correct data extraction

                        setData(prevData => [...prevData, ...newJobs]);
                        setPage(response.props.jobs.current_page as any);
                        setHasMore((response.props.jobs.current_page as any) < (response.props.jobs.last_page as any));
                    } else {
                        // Handle the case where jobs is not in the expected format
                        setHasMore(false);
                    }
                    // setHasMore(response.props.jobs.current_page as any < response.props.jobs.last_page as any);
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
        <Card title="Inactive Jobs">
            <div id="scrollableDiv-inactive" style={{maxHeight: "70vh", overflowY: "auto", padding: "10px"}}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                    endMessage={<Divider plain>No more inactive jobs 🤐</Divider>}
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
