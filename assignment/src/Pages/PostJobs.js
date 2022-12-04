import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import "./login.css";
import map from "./loc.svg"
import Header from "../component/HeaderC/Header";
import nxt from "./Nex.svg";
import prev from "./Prev.svg";
function PostJobs() {
        const [currentPage, setCurrentPage] = useState(1);
        const [postPerPage, setPostPerPage] = useState(12);
        const [jobData, setJobData] = useState([]);
        const [lastPage, setLastPage] = useState();

        const indexOfLastPost = currentPage * postPerPage
        const indexOfFirstPost = indexOfLastPost - postPerPage
        const currentPost = jobData.slice(indexOfFirstPost, indexOfLastPost)

        const fetchData = async () => {
                const token = localStorage.getItem("token")
                let result = await fetch(
                        "https://jobs-api.squareboat.info/api/v1/recruiters/jobs",
                        {
                                method: "GET",
                                headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": token
                                },
                        }
                );
                result = await result.json();
                console.log("console", result.data.data)
                setJobData(result.data.data)
                setLastPage(result.data.data.length)
        }
        useEffect(() => {

                fetchData();
                toast.info("You have successfully logged in.", { className: 'toast-message' });

        }, [])


        return (
                <>
                        <Header />
                        <div className="loginContainer">

                        </div>
                        <div style={{ height: "420px", backgroundColor: "#EDF6FF" }}>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <section >

                                        {currentPost &&
                                                currentPost.map((v, k) => {
                                                        return (
                                                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", height: "fit-content", marginBottom: "20px" }}>
                                                                        <div style={{ width: "260px", marginLeft: "20px", textAlign: "center", lineHight: "50px", backgroundColor: "white", zIndex: "1", height: "162px", marginBottom: "0px", borderRadius: "6px", boxShadow: " 0px 3px 6px #557DA526" }} >
                                                                                <div className="jobtitle">
                                                                                        {currentPost && v.title}
                                                                                </div>
                                                                                <div className="description">
                                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt…
                                                                                </div>
                                                                                <div className="locationcontainer">
                                                                                        <div style={{ display: "flex", marginLeft: "15px", marginTop: "10px" }}>
                                                                                                <div style={{ height: "15px", width: "10px" }}>
                                                                                                        <img src={map} alt="React Logo" />
                                                                                                </div>
                                                                                                <div style={{ height: "16px", width: "64px", overflow: "hidden", marginLeft: "2px" }}>
                                                                                                        <p >{currentPost && v.location}</p>
                                                                                                </div>
                                                                                        </div>
                                                                                        <div style={{ marginTop: "3px", marginRight: "15px" }}>
                                                                                                <button className="viewApplication">View Applications</button>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                </div>

                                                        )
                                                })
                                        }



                                </section>

                        </div>
                        <div className="pagination">
                                <button className='prev'
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prevState) => prevState - 1)}
                                >
                                        <img src={prev}></img>
                                </button>
                                <div className='no'>
                                        <p>{currentPage}</p>
                                </div>
                                <button className="prev" disabled={currentPage >= lastPage / postPerPage} onClick={() => setCurrentPage((prevState) => prevState + 1)}>
                                        <img src={nxt}></img>
                                </button>
                        </div>

                </>

        );

}

export default PostJobs;