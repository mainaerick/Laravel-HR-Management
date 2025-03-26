interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    application_date: string;
    status: string;
    job_opening: {
        title: string;
    };
}
