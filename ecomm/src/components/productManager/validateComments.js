import {
    Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function ValidateComments() {
  const [comments, setComments] = useState([]);
  useEffect(() => { 
    getComments()
  }, []);

  function getComments() {
    fetch("http://localhost:8080/getcomment/productmanager")
      .then((response) => response.json())
      .then((result) => {
        setComments(result);
      });
  }

  function onClickVerify(id) {
    Axios.put("http://localhost:8080/verifycomment/", {
      id: id,
    });
    window.location.reload(false);
  }
  function onClickDelete(id) {
    Axios.put("http://localhost:8080/deletecomment/", {
      id: id,
    });
    window.location.reload(false);
  }

  return (
    <div>
        {comments.map((comment) => (
      <Card>
        <CardBody>
          <CardTitle tag="h5">{comment.productName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{comment.userName}</CardSubtitle>
          <CardText>
           {comment.comment}
          </CardText>
          <Button outline color="success"onClick={()=> onClickVerify(comment._id)}>Verify</Button>
          <Button style={{marginLeft:"15px"}}outline color="danger" onClick={()=> onClickDelete(comment._id)}>Delete</Button>
        </CardBody>
      </Card>
      ))}
    </div>
  );
}

export default ValidateComments;
