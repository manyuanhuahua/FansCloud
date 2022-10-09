// import React from "react";
// import { useEffect, useState,useCallback,useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getKeysThunk } from "../../store/aws";


// import S3 from 'react-aws-s3';




// const UploadSong = ()=>{
//     const dispatch = useDispatch()
//     const keys = useSelector(state => state.aws);
//     const config = {
//         bucketName: 'fanscloud-bucket',
//         region: 'us-west-1',
//         accessKeyId: keys.access,
//         secretAccessKey: keys.secret,
//         /* optional */
//     }
//     useEffect(()=>{
//         dispatch(getKeysThunk())
//     },[dispatch])



//     const ReactS3Client = new S3(config);




//     const upload = (e)=>{
//         console.log(e.target.files[0])
//         const newFileName = 'test-file';
//         ReactS3Client
//             .uploadFile(e.target.files[0],newFileName)
//             .then(data => console.log("in S3-----",data))
//             .catch(err => console.error(err))
//     }

//     return (
//         <div>
//             <form onSubmit={upload}>
//             <input
//             type='file'
//             onChange={upload}
//             accept='.mp3'
//             />
//             <button type="submit" >upload</button>

//             </form>
//         </div>
//     )
// }

// export default UploadSong
