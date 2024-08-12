import React, { useEffect, useRef, useState } from 'react';
import useFileUpload from '../../../utils/hooks/useUploadFile';
import placholder from '../../../assets/img/no-image.png';

const UploadeFileButton = ({
  fileLocation,
  filedefaultName,
  onUploadeDone,
}: {
  fileLocation: string;
  filedefaultName: string;
  onUploadeDone: (imageURL: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    uploadFile,
    confirmUpload,
    downloadURL,
    error,
    confirmationNeeded,
    uploadLoading,
  } = useFileUpload();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = () => {
    if (file) {
      const filePath = `${fileLocation}/${filedefaultName}`; // Specify the path and name for the file
      uploadFile(file, filePath);
    }
  };

  const handleConfirmUpload = () => {
    confirmUpload();
  };

  useEffect(() => {
    if (downloadURL) {
      onUploadeDone(downloadURL);
    }
  }, [downloadURL, onUploadeDone]);

  return (
    <div>
      {/* Hidden file input */}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* Custom image preview */}

      {file && (
        <div>
          <small className='d-block text-muted text-center mt-2'>
            Nueva Imagen ({Math.trunc(file.size / 1024)} KB)
          </small>
          <object
            data={URL.createObjectURL(file)}
            type='image/png'
            className='img-fluid'
          >
            <img
              src={placholder}
              alt='Preview'
              className='img-fluid'
            />
          </object>
        </div>
      )}
      {uploadLoading && (
        <div className='progress my-3'>
          <div className='progress-bar progress-bar-indeterminate bg-green'></div>
        </div>
      )}
      {!uploadLoading && (
        <div className='d-flex gap-1 mt-2'>
          {/* Custom upload button */}
          <button
            className={`btn btn-primary w-100 ${
              file ? 'd-none' : ''
            }`}
            onClick={handleUploadClick}
          >
            <i className='fa-solid fa-image me-2' /> Nueva imagen
          </button>

          {/* Upload button */}
          <button
            className={`btn btn-primary ${file ? '' : 'd-none'}`}
            onClick={handleUpload}
            disabled={!file}
          >
            <div>
              Guardar
              <i className='fa-solid fa-arrow-up-from-bracket ms-2' />
            </div>
          </button>
          <button
            className={`btn btn-danger ${file ? '' : 'd-none'}`}
            onClick={() => setFile(null)}
            disabled={!file}
          >
            Cancelar{' '}
          </button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className='datagrid-content'>
          <span className='status-red'>
            Error al subir la imagen,
          </span>
        </div>
      )}

      {/* Confirmation prompt */}
      {confirmationNeeded && (
        <div>
          <p>
            A file with this name already exists and is not an image.
            Do you want to replace it?
          </p>
          <button onClick={handleConfirmUpload}>Yes, Replace</button>
        </div>
      )}
    </div>
  );
};

export default UploadeFileButton;
