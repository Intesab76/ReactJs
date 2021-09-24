import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';


const View = () => {
    const [author , setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [authorContent, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                author,
                title,
		authorContent
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setAuthor(content.name);
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

     return (

	<form onSubmit = {this.submitHandler}>
      <div class="container">
        <div class="card m-4">
          <div class="card-body">
            <h2 class="pt-4">Create Post</h2>
            <div class="form-group">
              <label for="Author">Author</label>
              <input
                type="text" name = "author" value = {author} onChange = {e => setAuthor(e.target.value)}
                class="form-control"
                placeholder="Author"
                id="author"
              />
            </div>
            <div class="form-group">
              <label for="Post Title">Post Title</label>
              <input
                type="text"
                class="form-control"
                placeholder="Post Title"  name = "title" value = {title} onChange = {e => setTitle(e.target.value)}
                id="postTitle"
              />
            </div>
            <div class="form-group">
              <label for="Post Content">Post Content</label>
              <textarea
                id="postContent"
                cols="30"
                rows="10"
                class="form-control"
                id="postContent" name = "content" value = {authorContent} onChange = {e => setContent(e.target.value)}
              ></textarea>
            </div>
            <input
              type="submit"
              value="Post"
              class="btn btn-primary my-3"
              id="submitBtn" type = "submit"
            />
            
          </div>
        </div>
      </div>
</form>

)


export default View;
