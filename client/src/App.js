import React from "react";
import axios from "axios";

import './App.css';


class App extends React.Component {
  
  state = {
    title: '',
    author: '',
    genre: '',
    rating: '',
    pic: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBookRecord();
  }

  //get the latest from the database
getBookRecord = () => {
  axios.get('/api')
    .then((response) => {
      const data = response.data; 
      this.setState({posts: data})
      console.log('Data has been received!!');
    })
    .catch(() => {
      alert("error retrieving data in react")
    })
}

handleChange = ({target}) => {
  const {name, value} = target
  this.setState({[name]: value})
}

submit = (event) => {
  event.preventDefault();

  const payload = {
    title: this.state.title,
    author: this.state.author,
    genre: this.state.genre,
    rating: this.state.rating,
    pic: this.state.pic
  }

  // communicate over to server and use specified port to target specific routes to send that data back
  // clear data from form and render it automatically
  axios({
    url: 'api/save',
    method: 'POST',
    data: payload
  })
    .then( () => {
      console.log('data sent to the server')
      this.resetUserInputs();
      this.getBookRecord();
    })
    .catch( () => {
      console.log('internal server error')
    });;
}

  resetUserInputs = () => {
    this.setState({
      title: '',
      author: '',
      genre: '',
      rating: '',
      pic: ''
    })
  }


  displayBookRecords = (posts) => {
    if (!posts.length) return null;

    return posts.map((post,index) => (
      <div key = {index}>
      <div className="col">
                <img className= "book-img" src= {post.pic} alt= "whoops"></img>
      </div>
      <div className = "col">
            <h4>{post.title}</h4>
            <p>Written by: {post.author}</p>
            <p>Genre: {post.genre}, Rating: {post.rating}</p>
      </div>
    </div>
    ))
  }

  render(){
    console.log("state: ", this.state)
    //JSX
    return(
      <div>
        <h2>Fan Favorites</h2>
        <h3>Books Suggested by you that I will hopefully read</h3>
        <dl className = "booklog">
          {this.displayBookRecords(this.state.posts)}
        </dl>
        <h3>Add Your Suggestion to the mix!</h3>
        <form onSubmit= {this.submit}> 
        <div className="form-input">
          <input 
            type="text"
            name="title"
            placeholder="Enter the Book Name"
            value= {this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-input">
          <input 
            type="text"
            name="author"
            placeholder="Enter the Author"
            value= {this.state.author}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-input">
          <input 
            type="text"
            name="genre"
            placeholder="Fiction or Nonfiction?"
            value= {this.state.genre}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-input">
          <input 
            type="text"
            name="rating"
            placeholder="Enter Your Rating Out of 5"
            value= {this.state.rating}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-input">
          <input 
            type="text"
            name="pic"
            placeholder="Do You Have a Link to a Pic? Paste it Here!"
            value= {this.state.pic}
            onChange={this.handleChange} />
        </div>
        <button>Submit</button>
        </form>
      </div>
    );

  }
}
export default App;