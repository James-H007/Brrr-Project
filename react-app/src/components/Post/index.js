import React from "react";
import heart from "../../assets/heart-regular.svg"
import comment from "../../assets/comment-regular.svg"
import share from "../../assets/share.svg"
import "./post.css"

const Post = () => {
    return (
        <>
            <div className="post-container">
                <div>
                    <header className="post-header">
                        <div><img src="https://thelifeofyourtime.files.wordpress.com/2016/05/bloodroot.jpg" alt="flower" className="post-owner-icon" /> </div>
                        <div className="post-owner-time">
                            <div className="post-owner">
                                Post Owner
                            </div>
                            <div className="post-time">
                                Post Time
                            </div>
                        </div>
                    </header>
                    <div className="post-body">
                        <p className="post-content">
                            Post Content
                        </p>
                        <p className="post-description">
                            Post description
                        </p>
                    </div>
                    <footer>
                        <div className="post-stats">
                            <p className="post-notes">Note Count</p>
                            <div className="post-icons">
                                <div className="post-icon"><img src={share} alt="heart-icon" /></div>
                                <div className="post-icon"><img src={comment} alt="comment-icon" /></div>
                                <div className="post-icon"><img src={heart} alt="heart-icon" /></div>

                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Post