import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import { Button } from "react-bootstrap";

import "./image-crop.css";
import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "../helpers";

const IMAGE_MAX_SIZE = 20000000; // bytes = 20mb
const ASPECT = 9 / 12;
const WIDTH = 50;
const UPLOAD_SUCCESS_TEXT = "добавлено";
const UPLOAD_ERROR_TEXT = "ошибка";
const API_URL = process.env.REACT_APP_API_URL;
const ACCEPTED_FILE_TYPES =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const ACCEPTED_FILE_TYPES_ARRAY = ACCEPTED_FILE_TYPES.split(",").map(item => {
  return item.trim();
});
const styles = {
  modalFooter: {
    position: "relative"
  }
};
class ImageCrop extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: ASPECT,
        width: WIDTH
      }
    };
  }

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > IMAGE_MAX_SIZE) {
        alert(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      if (!ACCEPTED_FILE_TYPES_ARRAY.includes(currentFileType)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            // console.log(myFileItemReader.result)
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult)
            });
          },
          false
        );
        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  clearForm = () => {
    this.handleClearToDefault();
    this.props.clearNameInput();
  };

  handleOnCropChange = crop => {
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  };

  handleUploadClick = e => {
    e.preventDefault();
    const { imgSrc, imgSrcExt } = this.state;
    const { name, facemashId } = this.props;

    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;

      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      const filename = "previewFile." + imgSrcExt;
      const croppedFile = base64StringtoFile(imageData64, filename);
      const data = new FormData();
      data.append("photo", croppedFile);
      data.append("person", name);
      data.append("facemash_id", facemashId);
      fetch(API_URL + "/user/add-girl", {
        method: "post",
        body: data
      }).then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          this.setState({
            uploadStatus: UPLOAD_ERROR_TEXT
          });
          return;
        } else {
          this.clearForm();
          this.setState({
            uploadStatus: UPLOAD_SUCCESS_TEXT
          });
        }
      });
    }
  };

  handleClearToDefault = e => {
    if (e) e.preventDefault();
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: ASPECT,
        width: WIDTH
      }
    });
    this.fileInputRef.current.value = null;
  };

  handleImageLoaded = image => {
    //console.log(image)
  };

  handleFileSelect = event => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult),
              uploadStatus: ""
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };
  render() {
    const { imgSrc, uploadStatus } = this.state;
    const { name } = this.props;

    return (
      <div>
        <input
          ref={this.fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          multiple={false}
          onChange={this.handleFileSelect}
        />
        {imgSrc !== null && (
          <div>
            <ReactCrop
              src={imgSrc}
              crop={this.state.crop}
              onImageLoaded={this.handleImageLoaded}
              onComplete={this.handleOnCropComplete}
              onChange={this.handleOnCropChange}
            />
            <br />
            <canvas
              ref={this.imagePreviewCanvasRef}
              className="d-none d-sm-none"
            />
          </div>
        )}
        <div className="modal-footer" style={styles.modalFooter}>
          <Button onClick={this.props.handleModalOpening} variant="danger">
            выйти
          </Button>
          <Button
            variant="success"
            type="submit"
            onClick={this.handleUploadClick}
            disabled={name.length ? false : true}
          >
            загрузить
          </Button>
          <div
            style={Object.assign(
              {},
              { position: "absolute", left: 0 },
              uploadStatus === UPLOAD_SUCCESS_TEXT
                ? { color: "green" }
                : { color: "red" }
            )}
          >
            {uploadStatus}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCrop;
