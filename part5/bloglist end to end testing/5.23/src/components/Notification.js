const Notification = ({ errorMessage, successMessage }) => {
  const successStyle = {
    border: '1px solid green',
    padding: '10px',
    color: 'green'
  }
  const errorStyle = {
    border: '1px solid red',
    padding: '10px',
    color: 'red'
  }
  if(errorMessage) {
    return <div id="error" style={errorStyle}>{errorMessage}</div>
  } else if (successMessage) {
    return <div style={successStyle}>{successMessage}</div>
  }
}

export default Notification