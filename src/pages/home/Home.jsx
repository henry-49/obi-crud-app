import React from "react";
import axios from "axios";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import "./home.css";

const Home = () => {
    // manage post states
    const [posts, setPosts] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    const columnDefs = [
        // { headerName: 'ID',     field: 'id',     width: 70 },
        { headerName: 'Title',  field: 'title',  width: 300 },
        { headerName: 'Body',   field: 'body',    width: 300 },
        {
            headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
              <Button className="" variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>Update</Button>
              <Button className="dBtn" variant="outlined" color="secondary" onClick={() => handleDelete(params.data)}>Delete</Button>
            </div>
          },
      ];

      const onGridReady = (params) => {
        setGridApi(gridApi.params);
      }

      const defaultColDef = {
          sortable: true,
          flex: 1, filter: true,
          floatingFilter: true
      }
      
    // api
    const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';

    // fetch post on page load
   useEffect(() => {
        const getPosts = async () => {
            const {data: res} = await axios.get(apiEndPoint);
            setPosts(res)
            };

            getPosts();
   },[])

   // add new post
   const addPost = async () => {
       const post = {title: 'New Post', body: 'new'};
       // create new post
      await axios.post(apiEndPoint, post);
      setPosts([post, ...posts]);
   }

   // update post
   const handleUpdate = async (post) => {
    const confirm = window.confirm("Are you sure, you want to update this row ?")
    post.title = 'Update title';
    confirm && await axios.put(apiEndPoint + '/' + post.id);
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = {...post};
    setPosts(postsClone);
   }

   // delete post
   const handleDelete = async (post) => {
    const confirm = window.confirm("Are you sure, you want to delete this row", post.id)
        if (confirm) {
        await axios.delete(apiEndPoint + '/' + post.id + post);
            setPosts(posts.filter(p => p.id !== post.id));
        }
   }

        return (
            <div>
              <h2 className="ph1"> There are {posts.length } post in the database</h2>
            <Grid className="gb" align="right">
                <Button 
                className="mb-5"
                variant="contained" 
                color="primary" 
                onClick={addPost}>Add post</Button>
            </Grid>

            {/* <table className="table border shadow">
                  <thead className="thead-dark">
                      <tr>
                          <th>Title</th>
                          <th>Update</th>
                          <th>Delete</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {posts.map(post => 
                          <tr key={post.id}>
                              <td> {post.title}</td>
                              <td> 
                                  <button 
                                  className="btn btn-info btn-sm"
                                  onClick={() => handleUpdate(post)}
                                  >
                                      Update
                                </button>
                             </td>
                              <td> 
                                  <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(post)}
                                    >
                                        Delete
                                </button>
                             </td>
                          </tr>
                          )}
                  </tbody>
              </table> */}
                <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={8} align="center">
                <div className="ag-theme-alpine" style={{ height: '500px' }}>
                    <AgGridReact
                    rowData={posts}
                    columnDefs={columnDefs} 
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={10}
                    />
                </div>
                </Grid>
                </Grid>
            </div>
        );

}

export default Home;