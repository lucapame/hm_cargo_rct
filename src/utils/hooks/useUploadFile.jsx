import { useState } from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../../resources/firebase/firebase';

const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [error, setError] = useState(null);
  const [confirmationNeeded, setConfirmationNeeded] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingFilePath, setPendingFilePath] = useState('');

  const uploadFile = async (file, filePath) => {
    setUploadLoading(true);
    if (!file) return;

    const storageRef = ref(storage, filePath);

    try {
      const metadata = await getMetadata(storageRef);

      if (metadata.contentType.startsWith('image/')) {
        await replaceFile(storageRef, file);
      } else {
        setPendingFile(file);
        setPendingFilePath(filePath);
        setConfirmationNeeded(true);
      }
    } catch (err) {
      if (err.code === 'storage/object-not-found') {
        await startUpload(storageRef, file);
      } else {
        setError(err);
      }
    }
  };

  const confirmUpload = async () => {
    if (pendingFile && pendingFilePath) {
      const storageRef = ref(storage, pendingFilePath);
      await replaceFile(storageRef, pendingFile);
      setConfirmationNeeded(false);
      setPendingFile(null);
      setPendingFilePath('');
    }
  };

  const replaceFile = async (storageRef, file) => {
    try {
      await deleteObject(storageRef);
      await startUpload(storageRef, file);
    } catch (err) {
      setError(err);
    }
  };

  const startUpload = (storageRef, file) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        // update progress
        setUploadProgress(percent);
      },
      (error) => {
        console.error('Upload error:', error);
        setError(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setUploadLoading(false);
      },
    );
  };

  return {
    uploadFile,
    confirmUpload,
    uploadProgress,
    downloadURL,
    error,
    confirmationNeeded,
    uploadLoading,
  };
};

export default useFileUpload;
