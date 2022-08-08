import { update } from "../post/api-post";
import React, { useEffect, useState } from "react";
import { listNewsFeedByPost } from "../post/api-post";
import auth from "./../auth/auth-helper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#efefef",
    padding: `${theme.spacing(3)}px 0px 1px`,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    boxShadow: "none",
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    marginBottom: 5,
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%",
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: "super",
  },
}));

const EditPost = ({ match }) => {
  const classes = useStyles();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const jwt = auth.isAuthenticated();

  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    text: "",
    photo: "",
  });

  const editPostHandler = (e) => {
    e.preventDefault();
    let post = new FormData();
    values.text && post.append("text", values.text);
    values.photo && post.append("photo", values.photo);
    console.log(post);
    update(
      {
        postId: match.params.postId,
      },
      {
        t: jwt.token,
      },
      post
    ).then(() => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values });
        setRedirect(true);
      }
    });
  };

  const handleChange = (name) => (e) => {
    e.persist();
    // console.log(e.target.files[0]);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    setValues({ ...values, [name]: value });
    // setPostData((prev) => ({ ...prev, text: e.target.value }));
  };

  useEffect(() => {
    listNewsFeedByPost(
      { postId: match.params.postId },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setValues({
          ...values,
          text: data.text,
          photo: data.photo,
        });
        // setPostData({ text: data.text, src: data.img });
      }
    });
  }, []);

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <Card className={classes.card}>
      {/* <CardHeader
        avatar={<Avatar src={photoURL} />}
        title={values.user.name}
        className={classes.cardHeader}
      /> */}
      <CardContent className={classes.cardContent}>
        <TextField
          placeholder="Share your thoughts ..."
          multiline
          rows="3"
          value={values.text}
          onChange={handleChange("text")}
          className={classes.textField}
          margin="normal"
        />
        {/* {values.photo} */}
        <input
          accept="image/*"
          onChange={handleChange("photo")}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="secondary"
            className={classes.photoButton}
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>{" "}
        <span className={classes.filename}>
          {values.photo ? values.photo.name : ""}
        </span>
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          disabled={values.text === ""}
          onClick={editPostHandler}
          className={classes.submit}
        >
          POST
        </Button>
      </CardActions>
    </Card>
    // <Card>
    //   <FormGroup onSubmit={editPostHandler}>
    //     <Input value={values.text} onChange={updateTextHandler("text")}></Input>
    //     {/* <img src={values.img}></img> */}
    //     <Button onClick={editPostHandler}>submit</Button>
    //   </FormGroup>
    // </Card>
  );
};

export default EditPost;
