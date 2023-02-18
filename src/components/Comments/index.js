import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(comment => comment.id !== id),
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddButton = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state

    const initialContainerBackgroundColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    console.log(initialContainerBackgroundColor)

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      initialClassName: initialContainerBackgroundColor,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="comments-inputs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
            <form className="form " onSubmit={this.onAddButton}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
                value={nameInput}
              />
              <textarea
                rows="6"
                placeholder="Your Comment"
                type="text"
                className="comment-input"
                onChange={this.onChangeCommentInput}
                value={commentInput}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count ">{commentsList.length}</span>
            comments
          </p>
          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
