import {useParams, Link} from "react-router-dom";
import Jobs from "../data/Jobs";


function JobDetails(){
     const { id } = useParams();

  const job = Jobs.find((job) => job.id === Number(id));

  return (
    <main className="job-details">
      <div>
        <h1>{job.title}</h1>

      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Job Type: {job.type}</p>
      <p>Salary: {job.salary}</p>

      <h4>Job Description</h4>
      <p>{job.description}</p>

      <Link to={`/applications/apply?job=${job.id}`}>Apply Now</Link>
      </div>
    </main>
  );
}

export default JobDetails;
