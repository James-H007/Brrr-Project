import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, followABlog, getAllBlogs } from "../../store/blogs";
import { getCurrentUser } from "../../store/users";
import "./CreateBlogPage.css";
import loadingCat from "../../assets/cat.gif"

const CreateBlogPage = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [bannerImg, setBannerImg] = useState(
    "https://assets.tumblr.com/images/default_header/optica_pattern_05.png"
  );
  const [blogName, setBlogName] = useState("");
  const [blogAvatar, setBlogAvatar] = useState(
    "https://64.media.tumblr.com/bc21905428903d578557d130c89df226/3b296d0381ea9902-d0/s540x810/614684c8af1a0de38b3b7f5ace5f8de66e6c746d.png"
  );
  const [description, setDescription] = useState("");
  const [defaultBlog, setDefaultBlog] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [blogNameError, setBlogNameError] = useState("");
  const [blogNameSpaceError, setBlogNameSpaceError] = useState("")
  const [blogNameUniqueError, setBlogNameUniqueError] = useState("")
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)
  const user = useSelector((state) => state.user.currentUser);
  const allBlogs = useSelector((state) => state.blogs.blogs)
  const allBlogNames = allBlogs.map((blog) => blog.blogName)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser())
      .then(() => dispatch(getAllBlogs()))
      .then(() => { setIsLoaded(true) });
  }, [dispatch]);

  useEffect(() => {
    if (user.blogs && user.blogs.length === 0) {
      setDefaultBlog(true);
    } else {
      setDefaultBlog(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }

      const userInput = {
        blog_title: blogTitle,
        banner_img_url: bannerImg,
        blog_name: blogName.toLowerCase(),
        blog_avatar_url: blogAvatar,
        description: description,
        default_blog: defaultBlog,
      };

      const newBlog = await dispatch(createBlog(userInput));
      if (newBlog) {
        dispatch(followABlog(newBlog.blog.id))
        history.push(`/blog/${newBlog.blog.id}`);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (blogTitle.trim().length === 0 || blogTitle.length > 24) {
      setTitleError("Title must be between 1 and 24 characters");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (blogName.length === 0 || blogName.length > 24) {
      setBlogNameError("Blog name must be between 1 and 24 characters");
      isValid = false;
    } else {
      setBlogNameError("");
    }

    if (blogName.indexOf(' ') >= 0) {
      setBlogNameSpaceError("Blog name cannot have any spaces")
      isValid = false;
    }
    else {
      setBlogNameSpaceError("")
    }

    if (allBlogNames.includes(blogName.toLowerCase())) {
      setBlogNameUniqueError("Blog name must be unique")
      isValid = false;
    }
    else {
      setBlogNameUniqueError("")
    }

    if (description.length > 500) {
      setDescriptionError("Description cannot exceed 500 characters");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  return (
    <>
      {!isLoaded && (
        <>
          <div className="loading-box">
            <img src={loadingCat} alt="loading-cat" className="loading-cat" />
            <p className="loading-message">Loading...</p>
          </div>
        </>
      )}
      {isLoaded && (
        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="create_blog_container">
            <h1 className="create_blog_h1">Create a new blog</h1>
            <div className="create-blog-input-container">
              <label className="create_blog_label" htmlFor="title">
                Title: &nbsp;
              </label>
              <input
                className="create_blog_input"
                type="text"
                id="title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
              {titleError && <p className="errors">{titleError}</p>}
            </div>

            <div className="create-blog-input-container">
              <label className="create_blog_label" htmlFor="blogName">
                Blog Name: &nbsp;
              </label>
              <input
                className="create_blog_input"
                type="text"
                id="blogName"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
              />
              {blogNameError && <p className="errors">{blogNameError}</p>}
              {blogNameSpaceError && <p className="errors">{blogNameSpaceError}</p>}
              {blogNameUniqueError && <p className="errors">{blogNameUniqueError}</p>}
            </div>

            <div className="create-blog-input-container">
              <label className="create_blog_label" htmlFor="description">
                Description: &nbsp;
              </label>
              <textarea
                className="create_blog_input"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {descriptionError && <p className="errors">{descriptionError}</p>}
            </div>
            <button className="create_blog_button" type="submit">
              Create Blog
            </button>
          </div>
        </form>
      )}

    </>
  );
};

export default CreateBlogPage;
