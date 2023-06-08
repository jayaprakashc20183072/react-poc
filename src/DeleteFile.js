import React from 'react';

function DeleteFile({onDelete,id}) {
    // function handleClick() {
    //     onDelete(id);
    //   }
    
    return (
        <div>
            <button style={{marginRight:"700px"}} onClick={()=>onDelete(id)}>
        Delete
      </button>
        </div>
    );
}

export default DeleteFile;