import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import axios from 'axios';
function getBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const edit = async (data: any)=>{
 await axios.put('/api/user/', data);
}


const PicturesWall =(props:any)=> {
  const [state,setState]:any = React.useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
    ],
    initialLoad:true
  })

  const handleCancel = () =>setState({ previewVisible: false });

  const handlePreview = async (file:any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      console.log(file.preview)
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),

    });
  };
  console.log(props.state)
if(props.state.submit===true){
  console.log('Submit requested')
 let user:any ={};
  user.username = props.state.name;
  user.email = props.state.email;
  user.password = props.state.password;
  user.image= state.fileList.map((file:any)=>{
    console.log(file.thumbUrl);
    return file.thumbUrl
  })
  console.log(user);
  if(props.state.edit===false){
    props.onRegister(user);
  }
  else{
    console.log('edit Account');

    //edit the user's account
    edit(user);
  }

props.state.submit=false;

}
if(props.state.edit){
  if(state.initialLoad){
    setState({fileList:[{thumbUrl:props.state.thumbUrl, type:'image/jpeg', status:'done', name:'profile.jpg', percent:100, uid:"rc-upload-1604828000243-4" }]})
  }
 
}
  const handleChange = ({ fileList }:any) =>{

     fileList.map((file:any)=>{
         file.status='done'
    })  
    setState({fileList})
}
  
  ;


    const { previewVisible, previewImage, fileList, previewTitle } = state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
console.log(state);

    return (
      <div>
        <Upload
          multiple={false}

          listType="picture-card"
          fileList={state.fileList}
         onPreview={(file:any)=>{
          var image = new Image();
          image.src = file.thumbUrl;
  
          var w:any = window.open("");
          w.document.write(image.outerHTML);
         }}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }

export default PicturesWall;