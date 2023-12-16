import Button from "@mui/material/Button"

function App() {
  function testServer() {
    fetch("http://localhost:8080", {
        method: "GET",
    }).then((res) => res.text())
    .then((data) => alert(data))
  }

  return (
    <Button
      variant="contained"
      onClick={() => testServer()}
    >Hello, world!</Button>
  )
}

export default App
