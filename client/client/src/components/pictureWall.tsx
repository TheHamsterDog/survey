import axios from 'axios';
import { response } from 'express';
import React from 'react';
import ImageUploader from 'react-images-upload';
type Props={
  state:any, setState:any
  }
  type state={
    pictures:any
  }
class App extends React.Component<Props,state> {

    constructor(props:any) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles:any, pictureDataURLs:any) {
      pictureFiles.Url=pictureDataURLs;
      console.log(pictureDataURLs);
      
      console.log(pictureFiles)
      
        this.setState({
            pictures: pictureFiles
        });
    }

     onSubmit:Function = async (post:any) => {
       const response:any = await axios.post('/api/post', post)
      window.location.assign('http://localhost:3000/posts/'+response._id)
    }
    render() {
      if(this.props.state.submit){
          let post:any;
          console.log(this.props.state.post);
        post = this.props.state.post;
        post.images = this.state.pictures.Url;
        console.log(post);
        this.onSubmit(post)
          
      } 
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                withPreview
                
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        
        );
    }
}
export default App;