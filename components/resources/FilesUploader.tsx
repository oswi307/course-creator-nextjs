interface FilesUploaderProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
export default function FilesUploader({onChange}:FilesUploaderProps){
    return(
        <>
        <input onChange={onChange}  type="file" name="" id="" />
        
        </>
        
    )
}