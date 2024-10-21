
  
  function Toast(props){
    const notify = () => toast(props.message);
    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
  export default Toast;